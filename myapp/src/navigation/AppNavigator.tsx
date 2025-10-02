import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

import SplashScreen from '../screens/SplashScreen';
import EntryScreen from '../screens/EntryScreen';
import DashboardScreen from '../screens/DashboardScreen';
import GenerateReportScreen from '../screens/GenerateReportScreen';
import SavedDraftsScreen from '../screens/SavedDraftsScreen';
import PreviewScreen from '../screens/PreviewScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Entry"
          component={EntryScreen}
          options={{ title: 'Entry Form', headerShown: true }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: 'Dashboard', headerShown: true }}
        />
        <Stack.Screen
          name="GenerateReport"
          component={GenerateReportScreen}
          options={{ title: 'Generate Report', headerShown: true }}
        />
        <Stack.Screen
          name="SavedDrafts"
          component={SavedDraftsScreen}
          options={{ title: 'Saved Drafts', headerShown: true }}
        />
        <Stack.Screen
          name="Preview"
          component={PreviewScreen}
          options={{ title: 'Preview', headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
