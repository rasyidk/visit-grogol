<?php

namespace App\Http\Controllers;

use App\Models\Testimoni;
use Illuminate\Http\Request;

class TestimoniController extends Controller
{
    public function index(Request $request)
    {
        $query = Testimoni::query();

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('message', 'like', "%{$search}%")
                    ->orWhere('origin', 'like', "%{$search}%");
            });
        }

        if ($request->has('isApproved')) {
            $query->where('is_approved', filter_var($request->input('isApproved'), FILTER_VALIDATE_BOOLEAN));
        } elseif ($request->has('is_approved')) {
            $query->where('is_approved', filter_var($request->input('is_approved'), FILTER_VALIDATE_BOOLEAN));
        }

        $sortBy = $request->input('sortBy', 'position');
        $sortBy = [
            'name' => 'name',
            'rating' => 'rating',
            'position' => 'position',
            'createdAt' => 'created_at',
            'created_at' => 'created_at',
        ][$sortBy] ?? 'position';
        $sortOrder = strtolower($request->input('sortOrder', 'asc')) === 'desc' ? 'desc' : 'asc';

        $limit = $request->input('limit', 10);
        if ($limit === 'all') {
            return response()->json(['data' => $query->orderBy($sortBy, $sortOrder)->get()]);
        }

        $paginated = $query->orderBy($sortBy, $sortOrder)->paginate((int) $limit);

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
        $testimoni = Testimoni::create($this->normalisePayload($validated));

        return response()->json(['data' => $testimoni], 201);
    }

    public function update(Request $request, int $id)
    {
        $testimoni = Testimoni::findOrFail($id);
        $validated = $this->validatePayload($request);
        $testimoni->update($this->normalisePayload($validated));

        return response()->json(['data' => $testimoni->fresh()]);
    }

    public function destroy(int $id)
    {
        Testimoni::findOrFail($id)->delete();

        return response()->json(['message' => 'Testimoni berhasil dihapus']);
    }

    private function validatePayload(Request $request): array
    {
        return $request->validate([
            'name' => 'required|string|min:2|max:140',
            'role' => 'nullable|string|max:140',
            'roleEn' => 'nullable|string|max:140',
            'role_en' => 'nullable|string|max:140',
            'origin' => 'nullable|string|max:140',
            'avatar' => 'nullable|string|max:255',
            'message' => 'required|string|min:5',
            'messageEn' => 'nullable|string',
            'message_en' => 'nullable|string',
            'rating' => 'nullable|integer|min:1|max:5',
            'isApproved' => 'nullable|boolean',
            'is_approved' => 'nullable|boolean',
            'position' => 'nullable|integer|min:0',
        ]);
    }

    private function normalisePayload(array $validated): array
    {
        return [
            'name' => $validated['name'],
            'role' => $validated['role'] ?? null,
            'role_en' => $validated['roleEn'] ?? $validated['role_en'] ?? null,
            'origin' => $validated['origin'] ?? null,
            'avatar' => $validated['avatar'] ?? null,
            'message' => $validated['message'],
            'message_en' => $validated['messageEn'] ?? $validated['message_en'] ?? null,
            'rating' => $validated['rating'] ?? 5,
            'is_approved' => $validated['isApproved'] ?? $validated['is_approved'] ?? true,
            'position' => $validated['position'] ?? 0,
        ];
    }
}
