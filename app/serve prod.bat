@echo off
start cmd.exe @cmd /k "php artisan serve"
start cmd.exe @cmd /k "ngrok http 8000 -region=eu"
start cmd.exe @cmd /k "npm run prod"
start cmd.exe @cmd /k