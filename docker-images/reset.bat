@echo off
chcp 65001 >nul
setlocal

set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"
set /p "CONFIRM=Remove the local frontend container? (yes/no): "
if /i not "%CONFIRM%"=="yes" exit /b 0
docker compose down

endlocal
