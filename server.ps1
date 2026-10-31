# Lightweight Local HTTP Server using PowerShell System.Net.HttpListener
$port = 8080
$baseDir = $PSScriptRoot

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "=========================================================================" -ForegroundColor Cyan
    Write-Host "  SERVER PORTOFOLIO DIGITAL LK 2 BERHASIL BERJALAN" -ForegroundColor Green
    Write-Host "  Akses Website di: http://localhost:$port/" -ForegroundColor Yellow
    Write-Host "  Tekan Ctrl+C di jendela ini untuk menghentikan server." -ForegroundColor Gray
    Write-Host "=========================================================================" -ForegroundColor Cyan

    Start-Process "http://localhost:$port/"

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $rawUrl = $request.RawUrl.Split('?')[0].TrimStart('/')
        if ([string]::IsNullOrEmpty($rawUrl)) {
            $rawUrl = "index.html"
        }

        # URL Decode
        $decodedUrl = [System.Uri]::UnescapeDataString($rawUrl)
        $filePath = Join-Path $baseDir $decodedUrl.Replace('/', '\')

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = "application/octet-stream"
            switch ($ext) {
                ".html" { $mime = "text/html; charset=utf-8" }
                ".css"  { $mime = "text/css; charset=utf-8" }
                ".js"   { $mime = "application/javascript; charset=utf-8" }
                ".pdf"  { $mime = "application/pdf" }
                ".docx" { $mime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }
                ".png"  { $mime = "image/png" }
                ".jpg"  { $mime = "image/jpeg" }
                ".jpeg" { $mime = "image/jpeg" }
                ".svg"  { $mime = "image/svg+xml" }
            }

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $mime
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $notFoundText = [System.Text.Encoding]::UTF8.GetBytes("404 - File Not Found: $decodedUrl")
            $response.OutputStream.Write($notFoundText, 0, $notFoundText.Length)
        }

        $response.OutputStream.Close()
    }
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
} finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
}

