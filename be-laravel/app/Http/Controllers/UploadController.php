<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $purpose = $request->input('purpose');

        $request->validate([
            'purpose' => 'nullable|in:hero',
        ]);

        $request->validate([
            'file' => $purpose === 'hero'
                ? 'required|file|image|max:1024' // 1MB max for hero images
                : 'required|file|max:25600', // 25MB max for general uploads
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
