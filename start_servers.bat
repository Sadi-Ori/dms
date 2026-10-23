@echo off
echo ========================================================
echo Starting Ihsan Global Relief Platform
echo Backend: Django (http://127.0.0.1:8000)
echo Frontend: Next.js (http://localhost:3000)
echo ========================================================

start "Django Backend" cmd /k "cd /d %~dp0backend && python manage.py runserver 127.0.0.1:8000"
timeout /t 3 /nobreak > nul
start "Next.js Frontend" cmd /k "cd /d %~dp0frontend && npm run start -- -p 3000"

echo Both servers started!
echo Frontend: http://localhost:3000
echo Django Admin: http://127.0.0.1:8000/admin (admin / admin123456)
pause
