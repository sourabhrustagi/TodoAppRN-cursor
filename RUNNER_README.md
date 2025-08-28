# React Native Todo App - Runner Scripts

This project includes convenient runner scripts to simplify the development workflow across different platforms.

## 📁 Script Files

- `run-app.sh` - Unix/Linux/macOS shell script
- `run-app.bat` - Windows batch script
- `package.json` - NPM scripts for easy access

## 🚀 Quick Start

### Using NPM Scripts (Recommended)

```bash
# Run on iOS (macOS only)
npm run run:ios

# Run on Android
npm run run:android

# Run on Web
npm run run:web

# Run on all available platforms
npm run run:all

# Setup dependencies
npm run setup

# Clean and rebuild
npm run clean
```

### Using Shell Scripts Directly

#### Unix/Linux/macOS
```bash
# Make script executable (first time only)
chmod +x run-app.sh

# Run on specific platform
./run-app.sh ios
./run-app.sh android
./run-app.sh web
./run-app.sh all

# Setup and maintenance
./run-app.sh setup
./run-app.sh clean
./run-app.sh metro
./run-app.sh stop
```

#### Windows
```cmd
# Run on specific platform
run-app.bat android
run-app.bat web

# Setup and maintenance
run-app.bat setup
run-app.bat clean
run-app.bat metro
run-app.bat stop
```

## 📋 Available Commands

| Command | Description | Platform Support |
|---------|-------------|------------------|
| `ios` | Run on iOS simulator | macOS only |
| `android` | Run on Android emulator/device | All platforms |
| `web` | Run on web browser | All platforms |
| `all` | Run on all available platforms | All platforms |
| `setup` | Install dependencies and setup platforms | All platforms |
| `clean` | Clean project and rebuild | All platforms |
| `metro` | Start Metro bundler only | All platforms |
| `stop` | Stop Metro bundler | All platforms |
| `help` | Show help message | All platforms |

## 🔧 Features

### Automatic Setup
- ✅ Checks platform compatibility
- ✅ Installs npm dependencies
- ✅ Sets up iOS CocoaPods (macOS)
- ✅ Validates Android SDK setup
- ✅ Detects running emulators/devices

### Smart Metro Management
- ✅ Automatically starts Metro bundler
- ✅ Detects if Metro is already running
- ✅ Graceful shutdown on exit
- ✅ Background process management

### Error Handling
- ✅ Platform-specific error messages
- ✅ Dependency validation
- ✅ Graceful failure handling
- ✅ Colored output for better UX

### Cross-Platform Support
- ✅ macOS (iOS + Android + Web)
- ✅ Linux (Android + Web)
- ✅ Windows (Android + Web)

## 🛠️ Prerequisites

### For All Platforms
- Node.js >= 18
- npm or yarn
- React Native CLI

### For iOS Development (macOS only)
- Xcode
- CocoaPods
- Ruby (for bundler)

### For Android Development
- Android Studio
- Android SDK
- ANDROID_HOME environment variable
- Java Development Kit (JDK)

## 📱 Platform-Specific Notes

### iOS
- Requires macOS
- Automatically installs CocoaPods dependencies
- Uses Xcode for building
- Simulator will be launched automatically

### Android
- Works on all platforms
- Checks for running emulator or connected device
- Uses Gradle for building
- Requires Android SDK setup

### Web
- Works on all platforms
- Uses webpack dev server
- Opens in default browser
- Hot reload enabled

## 🔍 Troubleshooting

### Common Issues

#### Metro Bundler Issues
```bash
# Clear Metro cache
npm start -- --reset-cache

# Or use the clean command
npm run clean
```

#### iOS Build Issues
```bash
# Clean iOS build
cd ios && xcodebuild clean && cd ..

# Reinstall pods
cd ios && pod install && cd ..
```

#### Android Build Issues
```bash
# Clean Android build
cd android && ./gradlew clean && cd ..

# Check device connection
adb devices
```

#### Permission Issues
```bash
# Make script executable
chmod +x run-app.sh
```

### Error Messages

| Error | Solution |
|-------|----------|
| "iOS development is not available" | Install Xcode on macOS |
| "Android development is not available" | Install Android SDK and set ANDROID_HOME |
| "Metro bundler is already running" | Use `./run-app.sh stop` to stop it first |
| "No Android emulator detected" | Start an emulator from Android Studio |

## 🎯 Development Workflow

### Typical Development Session

1. **Setup** (first time only):
   ```bash
   npm run setup
   ```

2. **Start Development**:
   ```bash
   # For iOS development
   npm run run:ios
   
   # For Android development
   npm run run:android
   
   # For web development
   npm run run:web
   ```

3. **Clean Build** (when needed):
   ```bash
   npm run clean
   ```

### Multi-Platform Testing

```bash
# Test on all platforms simultaneously
npm run run:all
```

## 📊 Script Output

The scripts provide colored output for better readability:

- 🔵 **Blue**: Information messages
- 🟢 **Green**: Success messages
- 🟡 **Yellow**: Warning messages
- 🔴 **Red**: Error messages

## 🤝 Contributing

To modify the runner scripts:

1. Edit `run-app.sh` for Unix/Linux/macOS
2. Edit `run-app.bat` for Windows
3. Update `package.json` scripts if needed
4. Test on all target platforms

## 📝 Notes

- The scripts automatically handle dependency conflicts with `--legacy-peer-deps`
- Metro bundler is managed automatically
- Platform detection is built-in
- Error handling is comprehensive
- Scripts are idempotent (safe to run multiple times)

---

**Happy Coding! 🚀**

