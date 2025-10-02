#!/bin/bash

# Create app.json
cat > app.json << 'APPJSON'
{
  "expo": {
    "name": "CBRE Report Generator",
    "slug": "cbre-report-generator",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#047857"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.cbre.reportgenerator",
      "buildNumber": "1.0.0",
      "infoPlist": {
        "NSPhotoLibraryUsageDescription": "This app needs access to your photo library to upload images for reports.",
        "NSCameraUsageDescription": "This app needs access to your camera to take photos for reports.",
        "UIBackgroundModes": ["fetch"]
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#047857"
      },
      "edgeToEdgeEnabled": true,
      "predictiveBackGestureEnabled": false,
      "package": "com.cbre.reportgenerator",
      "versionCode": 1,
      "permissions": [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "The app needs access to your photos to add images to reports.",
          "cameraPermission": "The app needs access to your camera to take photos for reports."
        }
      ]
    ]
  }
}
APPJSON

# Create .env
cat > .env << 'ENVEOF'
EXPO_PUBLIC_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw
ENVEOF

# Create tsconfig.json
cat > tsconfig.json << 'TSCONFIG'
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true
  }
}
TSCONFIG

# Create index.ts
cat > index.ts << 'INDEXTS'
import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);
INDEXTS

# Create App.tsx
cat > App.tsx << 'APPTSX'
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AppProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </AppProvider>
  );
}
APPTSX

echo "✅ Configuration files created"
