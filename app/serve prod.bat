@echo off
cd C:\xampp\htdocs\Final-Year-Database\app

start cmd.exe @cmd /k "php artisan serve"
start cmd.exe @cmd /k "ngrok http 8000 -region=eu"
start cmd.exe @cmd /k "npm run prod"
start cmd.exe @cmd /k