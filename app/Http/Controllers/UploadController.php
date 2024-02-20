<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $file = $request->file('file');
        $chunkNumber = $request->input('chunkNumber');
        $totalChunks = $request->input('totalChunks');
        $fileName = $request->input('fileName');

        $uploadPath = public_path('uploads');

        if (!file_exists($uploadPath)) {
            mkdir($uploadPath, 0755, true);
        }

        Storage::put("public/uploads/{$fileName}_part_{$chunkNumber}", file_get_contents($file));

        if ($chunkNumber == $totalChunks) {
            $this->assembleChunks($fileName, $totalChunks, $uploadPath);
        }
        return response()->json(['success' => true]);
    }

    protected function assembleChunks($fileName, $totalChunks, $uploadPath)
    {
        $outputPath = public_path("uploads/{$fileName}");
        $outputHandle = fopen($outputPath, 'wb');
        for ($i = 1; $i <= $totalChunks; $i++) {
            fwrite($outputHandle, Storage::get("public/uploads/{$fileName}_part_{$i}"));
            Storage::delete("public/uploads/{$fileName}_part_{$i}");
        }
        fclose($outputHandle);
    }
}
