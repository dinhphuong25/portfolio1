@echo off
echo ==============================================
echo   1. Dang commit va push code len GitHub...
echo ==============================================
git add .
git commit -m "Update portfolio code"
git push origin main

echo.
echo ==============================================
echo   2. Dang kich hoat Cloudflare Build...
echo ==============================================
curl.exe -s -X POST "https://api.cloudflare.com/client/v4/workers/builds/deploy_hooks/9b03f98a-4887-4ec3-8d23-fd831ce76150"

echo.
echo ==============================================
echo   Hoan tat! Code da len GitHub va Cloudflare dang build.
echo ==============================================
pause
