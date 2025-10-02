import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

import SplashScreen from '../screens/SplashScreen';
import EntryScreen from '../screens/EntryScreen';
import DashboardScreen from '../screens/DashboardScreen';
import GenerateReportScreen from '../screens/GenerateReportScreen';
import SavedDraftsScreen from '../screens/SavedDraftsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Entry" component={EntryScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="GenerateReport" component={GenerateReportScreen} />
        <Stack.Screen name="SavedDrafts" component={SavedDraftsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
