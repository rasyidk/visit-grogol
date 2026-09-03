<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:5120', // 5MB max
        ]);

        $file = $request->file('file');
        
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        
        // Store in storage/app/public/uploads
        $path = $file->storeAs('uploads', $filename, 'public');

        return response()->json([
            'data' => [
                'url' => asset('storage/' . $path),
                'filename' => $filename
            ]
        ]);
    }
}
