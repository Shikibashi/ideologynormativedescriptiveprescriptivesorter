@echo off
chcp 65001 >nul
setlocal

set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"

if not exist ".env" (
    echo [ERROR] Copy .env.example to .env and adjust the port if needed.
    exit /b 1
)

for /f "usebackq tokens=1,2 delims==" %%a in (".env") do set "%%a=%%b"
docker info >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Docker is not running.
    exit /b 1
)

if exist "%PROJECT_NAME%-all.tar" docker load -i "%PROJECT_NAME%-all.tar"
docker compose up -d
docker compose ps

endlocal
