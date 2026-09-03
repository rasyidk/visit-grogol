<?php

namespace App\Http\Controllers;

use App\Models\Kuliner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class KulinerController extends Controller
{
    public function index(Request $request)
    {
        $query = Kuliner::query();

        if ($search = $request->input('search')) {
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('title_en', 'like', "%{$search}%");
        }

        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->input('is_active'), FILTER_VALIDATE_BOOLEAN));
        }

        $sortBy = $request->input('sortBy', 'created_at');
        if ($sortBy === 'createdAt') $sortBy = 'created_at';
        $sortOrder = $request->input('sortOrder', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $perPage = $request->input('limit', 10);
        $kuliner = $query->paginate($perPage);

        return response()->json([
            'data' => $kuliner->items(),
            'meta' => [
                'page' => $kuliner->currentPage(),
                'totalPages' => $kuliner->lastPage(),
                'limit' => $kuliner->perPage(),
                'total' => $kuliner->total(),
                'hasNext' => $kuliner->hasMorePages(),
                'hasPrev' => $kuliner->currentPage() > 1,
            ]
        ]);
    }

    public function store(Request $request)
    {
        abort_unless(auth('api')->user(), 403, 'Unauthorized access.');

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'titleEn' => 'nullable|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'contentEn' => 'nullable|string',
            'content_en' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'string',
            'isActive' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
            'isGalleryActive' => 'nullable|boolean',
            'is_gallery_active' => 'nullable|boolean',
        ]);

        $slug = Str::slug($validated['title']);
        $count = Kuliner::where('slug', 'like', "{$slug}%")->count();
        if ($count > 0) {
            $slug = "{$slug}-{$count}";
        }

        $titleEn = $validated['titleEn'] ?? $validated['title_en'] ?? null;
        $contentEn = $validated['contentEn'] ?? $validated['content_en'] ?? null;
        $isActive = $validated['isActive'] ?? $validated['is_active'] ?? true;
        $isGalleryActive = $validated['isGalleryActive'] ?? $validated['is_gallery_active'] ?? true;

        $kuliner = Kuliner::create([
            'slug' => $slug,
            'title' => $validated['title'],
            'title_en' => $titleEn,
            'content' => $validated['content'] ?? null,
            'content_en' => $contentEn,
            'thumbnail' => $validated['thumbnail'] ?? null,
            'images' => $validated['images'] ?? null,
            'is_active' => $isActive,
            'is_gallery_active' => $isGalleryActive,
        ]);

        return response()->json(['data' => $kuliner], 201);
    }

    public function show(string $id)
    {
        $kuliner = Kuliner::where('id', $id)->orWhere('slug', $id)->firstOrFail();
        return response()->json(['data' => $kuliner]);
    }

    public function update(Request $request, string $id)
    {
        abort_unless(auth('api')->user(), 403, 'Unauthorized access.');

        $kuliner = Kuliner::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'titleEn' => 'nullable|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'contentEn' => 'nullable|string',
            'content_en' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'string',
            'isActive' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
            'isGalleryActive' => 'nullable|boolean',
            'is_gallery_active' => 'nullable|boolean',
        ]);

        if ($validated['title'] !== $kuliner->title) {
            $slug = Str::slug($validated['title']);
            $count = Kuliner::where('slug', 'like', "{$slug}%")->where('id', '!=', $id)->count();
            if ($count > 0) {
                $slug = "{$slug}-{$count}";
            }
            $kuliner->slug = $slug;
        }

        $kuliner->title = $validated['title'];
        
        if (array_key_exists('titleEn', $validated) || array_key_exists('title_en', $validated)) {
            $kuliner->title_en = $validated['titleEn'] ?? $validated['title_en'] ?? null;
        }

        if (array_key_exists('content', $validated)) {
            $kuliner->content = $validated['content'];
        }

        if (array_key_exists('contentEn', $validated) || array_key_exists('content_en', $validated)) {
            $kuliner->content_en = $validated['contentEn'] ?? $validated['content_en'] ?? null;
        }

        if (array_key_exists('thumbnail', $validated)) {
            if ($kuliner->thumbnail && $kuliner->thumbnail !== $validated['thumbnail']) {
                $this->deleteImageFile($kuliner->thumbnail);
            }
            $kuliner->thumbnail = $validated['thumbnail'];
        }

        if (array_key_exists('images', $validated)) {
            $oldImages = $kuliner->images ?? [];
            $newImages = $validated['images'] ?? [];
            
            $removedImages = array_diff($oldImages, $newImages);
            foreach ($removedImages as $removedImage) {
                $this->deleteImageFile($removedImage);
            }
            
            $kuliner->images = $newImages;
        }

        if (array_key_exists('isActive', $validated) || array_key_exists('is_active', $validated)) {
            $kuliner->is_active = $validated['isActive'] ?? $validated['is_active'] ?? true;
        }

        if (array_key_exists('isGalleryActive', $validated) || array_key_exists('is_gallery_active', $validated)) {
            $kuliner->is_gallery_active = $validated['isGalleryActive'] ?? $validated['is_gallery_active'] ?? true;
        }

        $kuliner->save();

        return response()->json(['data' => $kuliner]);
    }

    public function destroy(string $id)
    {
        abort_unless(auth('api')->user(), 403, 'Unauthorized access.');

        $kuliner = Kuliner::findOrFail($id);
        
        if ($kuliner->thumbnail) {
            $this->deleteImageFile($kuliner->thumbnail);
        }
        
        if ($kuliner->images) {
            foreach ($kuliner->images as $image) {
                $this->deleteImageFile($image);
            }
        }

        $kuliner->delete();

        return response()->json(['message' => 'Kuliner deleted successfully']);
    }

    private function deleteImageFile(?string $url)
    {
        if (!$url) return;
        
        $prefix = '/storage/';
        if (($pos = strpos($url, $prefix)) !== false) {
            $path = substr($url, $pos + strlen($prefix));
            Storage::disk('public')->delete($path);
        }
    }
}
