#!/bin/bash

# React Native Todo App Runner Script
# This script helps you run the app on different platforms

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check platform
get_platform() {
    case "$(uname -s)" in
        Darwin*)    echo 'macos';;
        Linux*)     echo 'linux';;
        CYGWIN*)    echo 'windows';;
        MINGW*)     echo 'windows';;
        *)          echo 'unknown';;
    esac
}

# Function to check if iOS development is available
check_ios_available() {
    if [[ "$(get_platform)" != "macos" ]]; then
        return 1
    fi
    
    if ! command_exists xcodebuild; then
        return 1
    fi
    
    return 0
}

# Function to check if Android development is available
check_android_available() {
    if ! command_exists adb; then
        return 1
    fi
    
    return 0
}

# Function to setup iOS dependencies
setup_ios() {
    print_status "Setting up iOS dependencies..."
    
    if ! check_ios_available; then
        print_error "iOS development is not available on this platform or Xcode is not installed"
        return 1
    fi
    
    # Check if Ruby and Bundler are available
    if ! command_exists ruby; then
        print_error "Ruby is not installed. Please install Ruby to use CocoaPods."
        return 1
    fi
    
    if ! command_exists bundle; then
        print_warning "Bundler not found. Installing bundler..."
        gem install bundler
    fi
    
    # Install CocoaPods dependencies
    print_status "Installing CocoaPods dependencies..."
    cd ios
    bundle install
    bundle exec pod install
    cd ..
    
    print_success "iOS dependencies installed successfully"
}

# Function to setup Android dependencies
setup_android() {
    print_status "Setting up Android dependencies..."
    
    if ! check_android_available; then
        print_error "Android development is not available. Please install Android SDK and set ANDROID_HOME"
        return 1
    fi
    
    # Check if Android emulator is running
    if ! adb devices | grep -q "emulator"; then
        print_warning "No Android emulator detected. Please start an emulator or connect a device."
        print_status "You can start an emulator from Android Studio or run: emulator -avd <avd_name>"
    fi
    
    print_success "Android setup completed"
}

# Function to install npm dependencies
install_dependencies() {
    print_status "Installing npm dependencies..."
    
    if [ ! -f "package.json" ]; then
        print_error "package.json not found. Are you in the correct directory?"
        return 1
    fi
    
    npm install --legacy-peer-deps
    
    print_success "Dependencies installed successfully"
}

# Function to start Metro bundler
start_metro() {
    print_status "Starting Metro bundler..."
    
    # Check if Metro is already running
    if lsof -Pi :8081 -sTCP:LISTEN -t >/dev/null 2>&1; then
        print_warning "Metro bundler is already running on port 8081"
        return 0
    fi
    
    # Start Metro in background
    npm start &
    METRO_PID=$!
    
    # Wait for Metro to start
    print_status "Waiting for Metro to start..."
    sleep 5
    
    if kill -0 $METRO_PID 2>/dev/null; then
        print_success "Metro bundler started successfully (PID: $METRO_PID)"
        echo $METRO_PID > .metro.pid
    else
        print_error "Failed to start Metro bundler"
        return 1
    fi
}

# Function to stop Metro bundler
stop_metro() {
    if [ -f ".metro.pid" ]; then
        METRO_PID=$(cat .metro.pid)
        if kill -0 $METRO_PID 2>/dev/null; then
            print_status "Stopping Metro bundler (PID: $METRO_PID)..."
            kill $METRO_PID
            rm .metro.pid
            print_success "Metro bundler stopped"
        fi
    fi
}

# Function to run on iOS
run_ios() {
    print_status "Running on iOS..."
    
    if ! check_ios_available; then
        print_error "iOS development is not available"
        return 1
    fi
    
    # Setup iOS dependencies
    setup_ios
    
    # Start Metro if not running
    start_metro
    
    # Run iOS app
    print_status "Building and running iOS app..."
    npm run ios
    
    print_success "iOS app launched successfully"
}

# Function to run on Android
run_android() {
    print_status "Running on Android..."
    
    if ! check_android_available; then
        print_error "Android development is not available"
        return 1
    fi
    
    # Setup Android dependencies
    setup_android
    
    # Start Metro if not running
    start_metro
    
    # Run Android app
    print_status "Building and running Android app..."
    npm run android
    
    print_success "Android app launched successfully"
}

# Function to run on Web
run_web() {
    print_status "Running on Web..."
    
    # Start Metro if not running
    start_metro
    
    # Run web app
    print_status "Building and running web app..."
    npm run web
    
    print_success "Web app launched successfully"
}

# Function to run on all platforms
run_all() {
    print_status "Running on all available platforms..."
    
    # Start Metro
    start_metro
    
    # Run platforms in parallel
    if check_ios_available; then
        print_status "Starting iOS build..."
        npm run ios &
        IOS_PID=$!
    fi
    
    if check_android_available; then
        print_status "Starting Android build..."
        npm run android &
        ANDROID_PID=$!
    fi
    
    print_status "Starting Web build..."
    npm run web &
    WEB_PID=$!
    
    # Wait for all processes
    if [ ! -z "$IOS_PID" ]; then
        wait $IOS_PID
    fi
    
    if [ ! -z "$ANDROID_PID" ]; then
        wait $ANDROID_PID
    fi
    
    wait $WEB_PID
    
    print_success "All platforms launched successfully"
}

# Function to clean project
clean_project() {
    print_status "Cleaning project..."
    
    # Stop Metro
    stop_metro
    
    # Clean npm cache
    npm cache clean --force
    
    # Remove node_modules and reinstall
    rm -rf node_modules
    npm install --legacy-peer-deps
    
    # Clean iOS build
    if check_ios_available; then
        print_status "Cleaning iOS build..."
        cd ios
        xcodebuild clean -workspace TodoApp.xcworkspace -scheme TodoApp
        cd ..
    fi
    
    # Clean Android build
    if check_android_available; then
        print_status "Cleaning Android build..."
        cd android
        ./gradlew clean
        cd ..
    fi
    
    print_success "Project cleaned successfully"
}

# Function to show help
show_help() {
    echo "React Native Todo App Runner"
    echo ""
    echo "Usage: $0 [OPTION]"
    echo ""
    echo "Options:"
    echo "  ios       Run on iOS simulator"
    echo "  android   Run on Android emulator/device"
    echo "  web       Run on web browser"
    echo "  all       Run on all available platforms"
    echo "  setup     Setup dependencies for all platforms"
    echo "  clean     Clean project and rebuild"
    echo "  metro     Start Metro bundler only"
    echo "  stop      Stop Metro bundler"
    echo "  help      Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 ios        # Run on iOS"
    echo "  $0 android    # Run on Android"
    echo "  $0 web        # Run on Web"
    echo "  $0 all        # Run on all platforms"
    echo ""
}

# Main script logic
main() {
    # Check if we're in the right directory
    if [ ! -f "package.json" ]; then
        print_error "package.json not found. Please run this script from the project root directory."
        exit 1
    fi
    
    # Parse command line arguments
    case "${1:-help}" in
        ios)
            run_ios
            ;;
        android)
            run_android
            ;;
        web)
            run_web
            ;;
        all)
            run_all
            ;;
        setup)
            install_dependencies
            setup_ios
            setup_android
            ;;
        clean)
            clean_project
            ;;
        metro)
            start_metro
            ;;
        stop)
            stop_metro
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
}

# Trap to clean up on exit
trap 'stop_metro' EXIT

# Run main function
main "$@"

