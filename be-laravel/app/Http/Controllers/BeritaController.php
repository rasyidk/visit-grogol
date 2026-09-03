<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class BeritaController extends Controller
{
    private function deleteImageFile($path)
    {
        if (!$path) return;
        // path is like /storage/uploads/...
        $storagePath = str_replace('/storage/', 'public/', $path);
        if (Storage::exists($storagePath)) {
            Storage::delete($storagePath);
        }
    }

    public function index(Request $request)
    {
        $query = Berita::query();

        if ($request->has('is_active')) {
            $query->where('is_active', filter_var($request->is_active, FILTER_VALIDATE_BOOLEAN));
        }

        $limit = $request->input('limit', 10);
        
        if ($limit === 'all') {
            return response()->json(['data' => $query->orderBy('published_at', 'desc')->get()]);
        }

        $paginated = $query->orderBy('published_at', 'desc')->paginate($limit);
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
            'content' => 'nullable|string',
            'content_en' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'author' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        if (empty($validated['author'])) {
            $validated['author'] = 'Admin';
        }

        $berita = Berita::create($validated);
        return response()->json(['data' => $berita], 201);
    }

    public function show($id)
    {
        $berita = Berita::where('id', $id)->orWhere('slug', $id)->firstOrFail();
        return response()->json(['data' => $berita]);
    }

    public function update(Request $request, $id)
    {
        $berita = Berita::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'content_en' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'author' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        if (empty($validated['author'])) {
            $validated['author'] = 'Admin';
        }

        // check if thumbnail changed
        if (isset($validated['thumbnail']) && $validated['thumbnail'] !== $berita->thumbnail) {
            $this->deleteImageFile($berita->thumbnail);
        }

        $berita->update($validated);
        return response()->json(['data' => $berita]);
    }

    public function destroy($id)
    {
        $berita = Berita::findOrFail($id);
        
        $this->deleteImageFile($berita->thumbnail);

        $berita->delete();
        return response()->json(['message' => 'Berita deleted successfully']);
    }
}
