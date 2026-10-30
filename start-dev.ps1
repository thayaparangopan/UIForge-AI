# UIForge AI - Unified Local Development Environment Launcher
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "         Launching UIForge AI Dev Stack           " -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

$VENV_PYTHON = Join-Path $PSScriptRoot ".venv\Scripts\python.exe"

if (-not (Test-Path $VENV_PYTHON)) {
    Write-Host "[!] Virtual environment not detected at .venv" -ForegroundColor Yellow
    Write-Host "[*] Creating .venv and installing requirements..." -ForegroundColor Yellow
    python -m venv (Join-Path $PSScriptRoot ".venv")
    & (Join-Path $PSScriptRoot ".venv\Scripts\pip.exe") install -r (Join-Path $PSScriptRoot "backend\requirements.txt")
}

Write-Host "[1/2] Launching FastAPI Backend on http://127.0.0.1:8000..." -ForegroundColor Green
$backendJob = Start-Job -ScriptBlock {
    param($rootPath, $pyPath)
    Set-Location $rootPath
    & $pyPath -m uvicorn app.main:app --app-dir backend --reload --port 8000
} -ArgumentList $PSScriptRoot, $VENV_PYTHON

Start-Sleep -Seconds 2

Write-Host "[2/2] Launching Vite Frontend on http://localhost:5173..." -ForegroundColor Green
Set-Location (Join-Path $PSScriptRoot "frontend")

try {
    npm run dev
}
finally {
    Write-Host "`nStopping backend server..." -ForegroundColor Yellow
    Stop-Job $backendJob -ErrorAction SilentlyContinue
    Remove-Job $backendJob -ErrorAction SilentlyContinue
    Write-Host "All processes cleanly stopped." -ForegroundColor Green
}
