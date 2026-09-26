<?php

namespace App\Http\Controllers;

use App\Models\SocialMedia;
use Illuminate\Http\Request;

class SocialMediaController extends Controller
{
    public function index(Request $request)
    {
        $query = SocialMedia::query();

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('username', 'like', "%{$search}%")
                    ->orWhere('platform', 'like', "%{$search}%");
            });
        }

        if ($request->filled('platform')) {
            $query->where('platform', $request->input('platform'));
        }

        if ($request->has('isActive') || $request->has('is_active')) {
            $value = $request->has('isActive') ? $request->input('isActive') : $request->input('is_active');
            $query->where('is_active', filter_var($value, FILTER_VALIDATE_BOOLEAN));
        }

        $sortBy = [
            'platform' => 'platform',
            'name' => 'name',
            'position' => 'position',
            'createdAt' => 'created_at',
            'created_at' => 'created_at',
        ][$request->input('sortBy', 'position')] ?? 'position';
        $sortOrder = strtolower($request->input('sortOrder', 'asc')) === 'desc' ? 'desc' : 'asc';
        $limit = min(max((int) $request->input('limit', 10), 1), 100);

        $paginated = $query->orderBy($sortBy, $sortOrder)->paginate($limit);

        return response()->json([
            'data' => $paginated->items(),
            'meta' => [
                'page' => $paginated->currentPage(),
                'totalPages' => $paginated->lastPage(),
                'limit' => $paginated->perPage(),
                'total' => $paginated->total(),
                'hasNext' => $paginated->hasMorePages(),
                'hasPrev' => $paginated->currentPage() > 1,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $this->validatePayload($request);
        $socialMedia = SocialMedia::create($this->normalisePayload($validated));

        return response()->json(['data' => $socialMedia], 201);
    }

    public function update(Request $request, int $id)
    {
        $socialMedia = SocialMedia::findOrFail($id);
        $validated = $this->validatePayload($request, $socialMedia->id);
        $socialMedia->update($this->normalisePayload($validated));

        return response()->json(['data' => $socialMedia->fresh()]);
    }

    public function destroy(int $id)
    {
        SocialMedia::findOrFail($id)->delete();

        return response()->json(['message' => 'Media sosial berhasil dihapus']);
    }

    private function validatePayload(Request $request, ?int $ignoreId = null): array
    {
        $uniquePlatform = 'unique:social_media,platform' . ($ignoreId ? ",{$ignoreId}" : '');

        return $request->validate([
            'platform' => ['required', 'string', 'in:INSTAGRAM,TIKTOK,FACEBOOK', $uniquePlatform],
            'name' => 'required|string|min:2|max:120',
            'username' => 'nullable|string|max:120',
            'url' => 'required|url|max:500',
            'isActive' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
            'position' => 'nullable|integer|min:0',
        ]);
    }

    private function normalisePayload(array $validated): array
    {
        return [
            'platform' => $validated['platform'],
            'name' => $validated['name'],
            'username' => $validated['username'] ?? null,
            'url' => $validated['url'],
            'is_active' => $validated['isActive'] ?? $validated['is_active'] ?? true,
            'position' => $validated['position'] ?? 0,
        ];
    }
}
