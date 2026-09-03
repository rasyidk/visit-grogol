<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AdminUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        abort_unless(auth()->user()->roles->contains('name', 'SUPERADMIN'), 403, 'Unauthorized access.');

        $query = User::query();

        // Search
        if ($search = $request->input('search')) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Filter by role
        if ($role = $request->input('role')) {
            $query->role($role);
        }

        // Sort
        $sortBy = $request->input('sortBy', 'created_at');
        if ($sortBy === 'createdAt') $sortBy = 'created_at';
        $sortOrder = $request->input('sortOrder', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $perPage = $request->input('perPage', 10);
        $users = $query->paginate($perPage);

        return response()->json([
            'data' => $users->items(),
            'meta' => [
                'page' => $users->currentPage(),
                'totalPages' => $users->lastPage(),
                'limit' => $users->perPage(),
                'total' => $users->total(),
                'hasNext' => $users->hasMorePages(),
                'hasPrev' => $users->currentPage() > 1,
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        abort_unless(auth()->user()->roles->contains('name', 'SUPERADMIN'), 403, 'Unauthorized access.');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|string',
            'isActive' => 'required|boolean',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'is_active' => $validated['isActive'],
        ]);

        // Assign role if it exists (assuming Spatie Roles are already seeded)
        $role = Role::firstOrCreate(['name' => $validated['role'], 'guard_name' => 'api']);
        $user->assignRole($role);

        return response()->json(['data' => $user], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        abort_unless(auth()->user()->roles->contains('name', 'SUPERADMIN'), 403, 'Unauthorized access.');

        $user = User::findOrFail($id);
        return response()->json(['data' => $user]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        abort_unless(auth()->user()->roles->contains('name', 'SUPERADMIN'), 403, 'Unauthorized access.');

        $user = User::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$user->id,
            'password' => 'nullable|string|min:8',
            'role' => 'required|string',
            'isActive' => 'required|boolean',
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->is_active = $validated['isActive'];

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        $role = Role::firstOrCreate(['name' => $validated['role'], 'guard_name' => 'api']);
        $user->syncRoles([$role]);

        return response()->json(['data' => $user]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        abort_unless(auth()->user()->roles->contains('name', 'SUPERADMIN'), 403, 'Unauthorized access.');

        $user = User::findOrFail($id);
        // Optional: Prevent deleting self
        if (auth('api')->id() === $user->id) {
            return response()->json(['message' => 'Anda tidak bisa menghapus akun Anda sendiri.'], 403);
        }

        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
}
