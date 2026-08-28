@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

for %%I in (.) do set "PROJECT_NAME=%%~nxI"
if exist "docker-images\.env" (
    for /f "usebackq tokens=1,2 delims==" %%a in ("docker-images\.env") do (
        if "%%a"=="PROJECT_NAME" set "PROJECT_NAME=%%b"
    )
)

echo ============================================
echo   !PROJECT_NAME! Docker image build
echo ============================================

docker info >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker is not running.
    exit /b 1
)

if not exist "docker-images" mkdir "docker-images"
docker build -t !PROJECT_NAME!-frontend:latest -f frontend/Dockerfile .
if errorlevel 1 exit /b 1
docker save !PROJECT_NAME!-frontend:latest -o docker-images/!PROJECT_NAME!-all.tar

echo Image saved to docker-images\!PROJECT_NAME!-all.tar
endlocal
