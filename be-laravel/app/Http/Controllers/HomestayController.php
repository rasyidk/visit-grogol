<?php

namespace App\Http\Controllers;

use App\Models\Homestay;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class HomestayController extends Controller
{
    private function deleteImageFile($path)
    {
        if (!$path) return;
        // path is like /storage/uploads/...
        // we need to replace /storage with public to delete from storage/app/public
        $storagePath = str_replace('/storage/', 'public/', $path);
        if (Storage::exists($storagePath)) {
            Storage::delete($storagePath);
        }
    }

    public function index(Request $request)
    {
        $query = Homestay::query();

        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        $limit = $request->input('limit', 10);
        
        if ($limit === 'all') {
            return response()->json($query->latest()->get());
        }

        $paginated = $query->latest()->paginate($limit);
        return response()->json([
            'data' => $paginated->items(),
            'meta' => [
                'page' => $paginated->currentPage(),
                'totalPages' => $paginated->lastPage(),
                'limit' => $paginated->perPage(),
                'total' => $paginated->total(),
                'hasNext' => $paginated->hasMorePages(),
                'hasPrev' => $paginated->currentPage() > 1,
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'price' => 'nullable|string|max:255',
            'facilities' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'images' => 'nullable|array',
            'is_active' => 'boolean',
            'is_gallery_active' => 'boolean',
        ]);

        $homestay = Homestay::create($validated);
        return response()->json(['data' => $homestay], 201);
    }

    public function show($id)
    {
        // Try finding by id first, then by slug for public facing urls
        $homestay = Homestay::where('id', $id)->orWhere('slug', $id)->firstOrFail();
        return response()->json(['data' => $homestay]);
    }

    public function update(Request $request, $id)
    {
        $homestay = Homestay::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'price' => 'nullable|string|max:255',
            'facilities' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'images' => 'nullable|array',
            'is_active' => 'boolean',
            'is_gallery_active' => 'boolean',
        ]);

        // check if thumbnail changed
        if (isset($validated['thumbnail']) && $validated['thumbnail'] !== $homestay->thumbnail) {
            $this->deleteImageFile($homestay->thumbnail);
        }

        // check if images removed
        if (isset($validated['images']) && is_array($homestay->images)) {
            $oldImages = $homestay->images;
            $newImages = $validated['images'];
            $removedImages = array_diff($oldImages, $newImages);
            foreach ($removedImages as $removedImage) {
                $this->deleteImageFile($removedImage);
            }
        }

        $homestay->update($validated);
        return response()->json(['data' => $homestay]);
    }

    public function destroy($id)
    {
        $homestay = Homestay::findOrFail($id);
        
        $this->deleteImageFile($homestay->thumbnail);
        
        if (is_array($homestay->images)) {
            foreach ($homestay->images as $image) {
                $this->deleteImageFile($image);
            }
        }

        $homestay->delete();
        return response()->json(null, 204);
    }
}
