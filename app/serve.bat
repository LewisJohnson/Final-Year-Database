cd C:\xampp\htdocs\Final-Year-Database\app

start cmd.exe @cmd /k "php artisan serve"
start cmd.exe @cmd /k "npm run watch"
start cmd.exe @cmd /k "ngrok http -region eu 8000"
start cmd.exe @cmd /k
"C:\xampp\xampp-control.exe"
exit
