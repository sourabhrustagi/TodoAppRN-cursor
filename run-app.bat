@echo off
setlocal enabledelayedexpansion

REM React Native Todo App Runner Script for Windows
REM This script helps you run the app on different platforms

set "RED=[91m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "NC=[0m"

REM Function to print colored output
:print_status
echo %BLUE%[INFO]%NC% %~1
goto :eof

:print_success
echo %GREEN%[SUCCESS]%NC% %~1
goto :eof

:print_warning
echo %YELLOW%[WARNING]%NC% %~1
goto :eof

:print_error
echo %RED%[ERROR]%NC% %~1
goto :eof

REM Check if command exists
:command_exists
where %~1 >nul 2>&1
if %errorlevel% equ 0 (
    exit /b 0
) else (
    exit /b 1
)

REM Check if Android development is available
:check_android_available
call :command_exists adb
if %errorlevel% neq 0 (
    call :print_error "Android development is not available. Please install Android SDK and set ANDROID_HOME"
    exit /b 1
)
exit /b 0

REM Setup Android dependencies
:setup_android
call :print_status "Setting up Android dependencies..."
call :check_android_available
if %errorlevel% neq 0 goto :eof

REM Check if Android emulator is running
adb devices | findstr "emulator" >nul
if %errorlevel% neq 0 (
    call :print_warning "No Android emulator detected. Please start an emulator or connect a device."
    call :print_status "You can start an emulator from Android Studio"
)
call :print_success "Android setup completed"
goto :eof

REM Install npm dependencies
:install_dependencies
call :print_status "Installing npm dependencies..."
if not exist "package.json" (
    call :print_error "package.json not found. Are you in the correct directory?"
    exit /b 1
)
npm install --legacy-peer-deps
call :print_success "Dependencies installed successfully"
goto :eof

REM Start Metro bundler
:start_metro
call :print_status "Starting Metro bundler..."
netstat -an | findstr ":8081" >nul
if %errorlevel% equ 0 (
    call :print_warning "Metro bundler is already running on port 8081"
    goto :eof
)

start /b npm start
timeout /t 5 /nobreak >nul
call :print_success "Metro bundler started successfully"
goto :eof

REM Stop Metro bundler
:stop_metro
call :print_status "Stopping Metro bundler..."
taskkill /f /im node.exe >nul 2>&1
call :print_success "Metro bundler stopped"
goto :eof

REM Run on Android
:run_android
call :print_status "Running on Android..."
call :check_android_available
if %errorlevel% neq 0 goto :eof

call :setup_android
call :start_metro
call :print_status "Building and running Android app..."
npm run android
call :print_success "Android app launched successfully"
goto :eof

REM Run on Web
:run_web
call :print_status "Running on Web..."
call :start_metro
call :print_status "Building and running web app..."
npm run web
call :print_success "Web app launched successfully"
goto :eof

REM Clean project
:clean_project
call :print_status "Cleaning project..."
call :stop_metro
call :print_status "Cleaning npm cache..."
npm cache clean --force
call :print_status "Removing node_modules..."
if exist "node_modules" rmdir /s /q node_modules
call :install_dependencies

if exist "android" (
    call :print_status "Cleaning Android build..."
    cd android
    gradlew clean
    cd ..
)
call :print_success "Project cleaned successfully"
goto :eof

REM Show help
:show_help
echo React Native Todo App Runner
echo.
echo Usage: %~nx0 [OPTION]
echo.
echo Options:
echo   android   Run on Android emulator/device
echo   web       Run on web browser
echo   setup     Setup dependencies
echo   clean     Clean project and rebuild
echo   metro     Start Metro bundler only
echo   stop      Stop Metro bundler
echo   help      Show this help message
echo.
echo Examples:
echo   %~nx0 android    # Run on Android
echo   %~nx0 web        # Run on Web
echo.
goto :eof

REM Main script logic
:main
REM Check if we're in the right directory
if not exist "package.json" (
    call :print_error "package.json not found. Please run this script from the project root directory."
    exit /b 1
)

REM Parse command line arguments
if "%1"=="" goto :show_help
if "%1"=="android" goto :run_android
if "%1"=="web" goto :run_web
if "%1"=="setup" (
    call :install_dependencies
    call :setup_android
    goto :eof
)
if "%1"=="clean" goto :clean_project
if "%1"=="metro" goto :start_metro
if "%1"=="stop" goto :stop_metro
if "%1"=="help" goto :show_help
if "%1"=="--help" goto :show_help
if "%1"=="-h" goto :show_help

call :print_error "Unknown option: %1"
call :show_help
exit /b 1

REM Run main function
call :main %*

