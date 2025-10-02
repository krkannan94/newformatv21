# CBRE Report Generator - Setup & Testing Guide

## ✅ Setup Complete

All configurations have been verified and the app is ready for testing!

## 📦 Verified Components

### 1. Package Dependencies ✅
All required packages are installed:
- ✅ expo (~54.0.12)
- ✅ expo-print (^15.0.7)
- ✅ expo-sharing (^14.0.7)
- ✅ expo-image-picker (^17.0.8)
- ✅ expo-file-system (^19.0.16)
- ✅ @react-navigation/native (^7.1.17)
- ✅ @react-navigation/native-stack (^7.3.26)
- ✅ @react-navigation/stack (^7.4.8)
- ✅ @react-native-async-storage/async-storage (^2.2.0)
- ✅ @supabase/supabase-js (^2.58.0)
- ✅ nativewind (^4.2.1) - For Tailwind CSS styling
- ✅ react-native-gesture-handler (^2.22.0)
- ✅ react-native-reanimated (^3.18.1)
- ✅ react-native-screens (^4.16.0)
- ✅ react-native-safe-area-context (^5.6.1)

### 2. Configuration Files ✅

**app.json**
- Properly configured for Expo managed workflow
- iOS bundle identifier: com.cbre.reportgenerator
- Android package: com.cbre.reportgenerator
- Camera and photo library permissions configured
- Image picker plugin enabled

**babel.config.js**
- babel-preset-expo configured
- nativewind/babel preset for Tailwind CSS
- react-native-reanimated plugin

**tailwind.config.js**
- NativeWind preset configured
- Content paths properly set

**metro.config.js**
- withNativeWind wrapper configured
- CSS input path set to ./global.css

**tsconfig.json**
- TypeScript configured for Expo
- NativeWind type definitions included

### 3. App Structure ✅

```
myapp/
├── App.tsx                    # Main app entry point
├── src/
│   ├── screens/              # All screen components
│   │   ├── SplashScreen.tsx
│   │   ├── EntryScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── GenerateReportScreen.tsx
│   │   ├── SavedDraftsScreen.tsx
│   │   └── PreviewScreen.tsx
│   ├── navigation/
│   │   └── AppNavigator.tsx  # React Navigation setup
│   ├── context/
│   │   └── AppContext.tsx    # Global state management
│   ├── utils/
│   │   ├── pdfGenerator.ts   # PDF generation (expo-print)
│   │   ├── storage.ts        # AsyncStorage wrapper
│   │   └── supabase.ts       # Supabase client
│   ├── types/
│   │   └── index.ts          # TypeScript types
│   └── data/
│       └── siteOptions.ts    # Form data options
├── assets/                   # App icons and splash
└── global.css               # NativeWind styles
```

### 4. TypeScript Compilation ✅
- No TypeScript errors
- All types properly defined
- Imports correctly resolved

## 🚀 How to Start Testing

### Method 1: Start Expo Dev Server

```bash
cd myapp
npx expo start
```

This will:
1. Start the Metro bundler
2. Display a QR code in the terminal
3. Open a web interface at http://localhost:8081

### Method 2: Platform-Specific Start

```bash
# For iOS Simulator (Mac only)
npx expo start --ios

# For Android Emulator
npx expo start --android

# For Web (testing purposes)
npx expo start --web
```

### Method 3: Using Tunnel (for testing on physical devices over internet)

```bash
npx expo start --tunnel
```

## 📱 Testing on Physical Devices

### iOS Device:
1. Install **Expo Go** from the App Store
2. Scan the QR code with the Camera app
3. App will open in Expo Go

### Android Device:
1. Install **Expo Go** from Google Play Store
2. Scan the QR code with the Expo Go app
3. App will load and run

## 🧪 What to Test

### 1. Navigation Flow ✓
- [ ] Splash screen appears and transitions to Entry screen
- [ ] Entry form navigation to Dashboard
- [ ] Dashboard navigation to Generate Report
- [ ] Navigation to Saved Drafts
- [ ] Navigation to Preview screen
- [ ] Back navigation works correctly

### 2. Form & Data Entry ✓
- [ ] Entry form accepts all fields
- [ ] Form validation works
- [ ] Account and Site dropdowns populate correctly
- [ ] Date picker works
- [ ] Progress bar updates as fields are filled

### 3. PDF Generation (expo-print) ✓
- [ ] Generate PDF button works
- [ ] PDF preview displays correctly
- [ ] PDF includes all form data
- [ ] PDF includes uploaded images
- [ ] PDF formatting is correct

### 4. PDF Sharing (expo-sharing) ✓
- [ ] Share button opens native share dialog
- [ ] Can share via email
- [ ] Can share via messaging apps
- [ ] Can save to Files/Drive
- [ ] PDF file is correctly formatted after sharing

### 5. Image Picker (expo-image-picker) ✓
- [ ] Camera access works
- [ ] Gallery access works
- [ ] Images display correctly after selection
- [ ] Multiple images can be added
- [ ] Images can be removed
- [ ] Before/After image labeling works

### 6. Local Storage (AsyncStorage) ✓
- [ ] Form data persists after app close
- [ ] Drafts are saved correctly
- [ ] Drafts list displays saved drafts
- [ ] Can load a draft
- [ ] Can delete a draft
- [ ] Recent activities are saved

### 7. Supabase Integration ✓
- [ ] Supabase client initializes
- [ ] Can connect to database
- [ ] Environment variables load correctly

### 8. UI/UX with NativeWind ✓
- [ ] Tailwind classes render correctly
- [ ] Responsive design works on different screen sizes
- [ ] Colors and styling match design
- [ ] Animations work smoothly
- [ ] Touch interactions are responsive

## 🐛 Common Issues & Solutions

### Issue: "Unable to resolve module"
**Solution**: Clear Metro cache and reinstall
```bash
rm -rf node_modules
npm install
npx expo start --clear
```

### Issue: "No compatible apps connected"
**Solution**: Make sure Expo Go is installed and connected to the same network

### Issue: TypeScript errors in editor
**Solution**: Restart TypeScript server in VS Code
```
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### Issue: Images not loading
**Solution**: Check permissions in app.json and ensure they're granted on device

### Issue: PDF generation fails
**Solution**: Check console logs, ensure expo-print and expo-sharing are properly installed

## 📊 Performance Checklist

- [ ] App loads in under 3 seconds
- [ ] Navigation transitions are smooth
- [ ] Image uploads don't freeze the UI
- [ ] PDF generation completes within 5 seconds
- [ ] No memory leaks after multiple operations
- [ ] App responds quickly to user interactions

## 🔐 Security Checklist

- [ ] Supabase credentials are in .env (not committed)
- [ ] AsyncStorage data is properly scoped
- [ ] Camera/Photo permissions are requested at runtime
- [ ] User data is validated before saving

## 📝 Test Data

Use these sample values for testing:

**Account**: Tech Corporation
**Site**: Building A - North Wing
**PM Task**: Monthly HVAC Inspection
**Service Provider**: Professional Maintenance Services
**Technician**: John Smith
**Date**: Today's date

## 🎯 Next Steps After Testing

1. **Fix any bugs found** during testing
2. **Optimize performance** based on observations
3. **Enhance UI/UX** based on user feedback
4. **Add more features** as needed:
   - Offline mode
   - Push notifications
   - Report templates
   - Analytics dashboard

## 🆘 Support

If you encounter any issues:

1. Check the console logs: `npx expo start` and look for errors
2. Check device logs in Expo Go app
3. Verify all dependencies are installed: `npm install`
4. Clear cache: `npx expo start --clear`
5. Check TypeScript: `npx tsc --noEmit`

## ✅ Setup Status

- [x] All dependencies installed
- [x] Configuration files verified
- [x] TypeScript compiles without errors
- [x] App structure properly organized
- [x] NativeWind configured
- [x] React Navigation set up
- [x] PDF generation ready
- [x] Storage utilities configured
- [x] Supabase client configured
- [x] Assets created

**Status**: 🟢 Ready for Testing!

---

To start testing right now, run:

```bash
cd myapp
npx expo start
```

Then scan the QR code with Expo Go on your device!
