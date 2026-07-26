@echo off
echo ============================================
echo  🚀 DEPLOY MIỄN PHÍ - SINH VIÊN TÁI CHẾ
echo ============================================
echo.
echo  Chọn nền tảng deploy:
echo.
echo  [1] Netlify Drop (Kéo thả - Dễ nhất)
echo  [2] Vercel (Tự động từ GitHub)
echo  [3] GitHub Pages (Vĩnh viễn)
echo  [4] Xem hướng dẫn chi tiết
echo.
set /p choice="Nhap so (1-4): "

if "%choice%"=="1" goto netlify
if "%choice%"=="2" goto vercel
if "%choice%"=="3" goto github
if "%choice%"=="4" goto guide
goto end

:netlify
echo.
echo ===== CACH 1: NETLIFY DROP (FREE) =====
echo.
echo  Buoc 1: Mo trinh duyet vao: https://app.netlify.com/drop
echo  Buoc 2: Keo tha thu muc sau vao trinh duyet:
echo     %~dp0..\frontend\dist\
echo  Buoc 3: Xong! Ban se co URL: https://ten-cua-ban.netlify.app
echo.
echo  * Co the doi ten mien thanh: https://svtaiche.netlify.app
echo  * Hoan toan mien phi, khong can the tin dung
echo.
pause
goto end

:vercel
echo.
echo ===== CACH 2: VERCEL (FREE) =====
echo.
echo  Buoc 1: Cai dat Vercel CLI:
echo     npm install -g vercel
echo.
echo  Buoc 2: Chay lenh:
echo     cd %~dp0..\frontend
echo     vercel --prod
echo.
echo  Buoc 3: Dang nhap bang GitHub/Google
echo  Buoc 4: Xong! URL: https://sinhvien-taiche.vercel.app
echo.
echo  * Vercel tu dong deploy moi khi push len GitHub
echo  * Ho tro ca backend serverless
echo.
pause
goto end

:github
echo.
echo ===== CACH 3: GITHUB PAGES (FREE) =====
echo.
echo  Buoc 1: Tao GitHub repo: https://github.com/new
echo     Ten repo: svtaiche
echo.
echo  Buoc 2: Copy folder dist vao docs:
echo     xcopy "%~dp0..\frontend\dist" "%~dp0..\docs\" /E /I
echo.
echo  Buoc 3: Push len GitHub:
echo     cd %~dp0..
echo     git init
echo     git add .
echo     git commit -m "Deploy SV Tai Che"
echo     git remote add origin https://github.com/[USERNAME]/svtaiche.git
echo     git push -u origin main
echo.
echo  Buoc 4: Vao GitHub Repo - Settings - Pages
echo     Chon branch: main, folder: /docs
echo     Save
echo.
echo  Buoc 5: Xong! URL: https://[USERNAME].github.io/svtaiche/
echo.
pause
goto end

:guide
echo.
echo ===== HUONG DAN CHI TIET =====
echo.
echo  Tat ca 3 cach deu MIEN PHI 100%, khong can:
echo    - Mua ten mien
echo    - Mua hosting
echo    - The tin dung
echo.
echo  De nhat: Cach 1 (Netlify Drop) - chi mat 30 giay
echo  Chuyen nghiep nhat: Cach 2 (Vercel)
echo  O?n dinh nhat: Cach 3 (GitHub Pages)
echo.
echo  File build da san sang tai:
echo     %~dp0..\frontend\dist\
echo.
pause
goto end

:end
echo.
echo Cam on ban da su dung! :)
pause

