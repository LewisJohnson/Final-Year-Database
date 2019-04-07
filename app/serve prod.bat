@echo off
cd C:\xampp\htdocs\Final-Year-Database\app

start cmd.exe @cmd /k "php artisan serve --port=80"
start cmd.exe @cmd /k "ngrok http 80 -region=eu -subdomain=sussexprojects.eu.ngrok.io"
start cmd.exe @cmd /k "npm run prod"
start cmd.exe @cmd /k