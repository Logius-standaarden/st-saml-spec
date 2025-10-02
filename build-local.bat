@echo off
SETLOCAL ENABLEEXTENSIONS

REM === Settings ===
SET PUBLISHED_VERSION=0.8
SET RESPEC_VERSION=35.4.2

SET PORT=8081


IF NOT EXIST snapshot mkdir snapshot

REM Clean previous ED
IF EXIST snapshot\ED (
    echo Removing previous snapshot\ED...
    rmdir /S /Q snapshot\ED
)

mkdir snapshot\ED
mkdir snapshot\ED\images


REM === Start ReSpec local server (in background) ===
REM echo Starting local ReSpec server on port %PORT%...
REM start "respec-server" /MIN cmd /C "npx respec@%RESPEC_VERSION% --localhost --port %PORT%"

REM === Wait for server to be ready ===
REM echo Waiting for ReSpec server to start...
REM powershell -Command "Start-Sleep -Seconds 7"

REM === Run ReSpec builds ===
echo Building dv.html...
call npx respec@%RESPEC_VERSION% --localhost --port %PORT% --verbose --src dv.html --out snapshot\ED\dv.html

REM echo Stopping ReSpec server...
REM taskkill /F /FI "WINDOWTITLE eq respec-server*" >nul 2>&1
REM powershell -Command "Start-Sleep -Seconds 3"
echo Building index.html...
call npx respec@%RESPEC_VERSION% --localhost --port %PORT% --verbose --src index.html --out snapshot\ED\index.html

REM === Kill ReSpec server ===
echo Stopping ReSpec server...
taskkill /F /FI "WINDOWTITLE eq respec-server*" >nul 2>&1

REM === Optional: HTML diff ===
REM IF EXIST snapshot\%PUBLISHED_VERSION%\index.html (
REM     echo Generating HTML diff...
REM     npx node-htmldiff@0.9.3 snapshot\%PUBLISHED_VERSION%\index.html snapshot\ED\index.html snapshot\ED\ed-diff.html
REM     npx node-htmldiff@0.9.3 snapshot\%PUBLISHED_VERSION%\dv.html snapshot\ED\dv.html snapshot\ED\ed-diff_dv.html
REM ) ELSE (
REM     echo Skipping HTML diff (no previous version found)
REM )

echo.
echo ===== Build complete! =====
echo
