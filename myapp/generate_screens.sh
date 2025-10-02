#!/bin/bash

# This script creates all 5 screen files for the CBRE Report Generator

echo "Creating screens..."

# Splash Screen
cat > src/screens/SplashScreen.tsx << 'SPLASH'
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type SplashScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

export default function SplashScreen({ navigation }: SplashScreenProps) {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Entry');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBg}>
            <Text style={styles.logoText}>CBRE</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Developed By Kannan</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#047857',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoBg: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 30,
    borderRadius: 20,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 10,
  },
});
SPLASH

echo "✅ SplashScreen created"

# Entry Screen - Placeholder
cat > src/screens/EntryScreen.tsx << 'ENTRY'
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, EntryFormData } from '../types';
import { useApp } from '../context/AppContext';
import { siteOptions, AccountType } from '../data/siteOptions';

type EntryScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Entry'>;
};

export default function EntryScreen({ navigation }: EntryScreenProps) {
  const { setFormData } = useApp();
  const [account, setAccount] = useState('');
  const [site, setSite] = useState('');
  const [pmTaskName, setPmTaskName] = useState('');
  const [serviceProvider, setServiceProvider] = useState('');
  const [serviceCompletedBy, setServiceCompletedBy] = useState('');
  const [dateOfMaintenance, setDateOfMaintenance] = useState('');

  const isFormValid = 
    account && 
    site && 
    pmTaskName && 
    serviceProvider && 
    serviceCompletedBy && 
    dateOfMaintenance;

  const handleSubmit = () => {
    if (!isFormValid) return;

    const formData: EntryFormData = {
      account,
      site,
      pmTaskName,
      serviceProvider,
      serviceCompletedBy,
      dateOfMaintenance,
    };

    setFormData(formData);
    navigation.navigate('Dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>CBRE</Text>
          </View>
          <Text style={styles.title}>Report Generator</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Account</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter account name"
              value={account}
              onChangeText={setAccount}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Site Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter site location"
              value={site}
              onChangeText={setSite}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Maintenance Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter task details"
              value={pmTaskName}
              onChangeText={setPmTaskName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Service Provider</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter provider name"
              value={serviceProvider}
              onChangeText={setServiceProvider}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Technician Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter technician name"
              value={serviceCompletedBy}
              onChangeText={setServiceCompletedBy}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
            <TextInput
              style={styles.input}
              placeholder="2025-10-02"
              value={dateOfMaintenance}
              onChangeText={setDateOfMaintenance}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, !isFormValid && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={!isFormValid}
          >
            <Text style={styles.buttonText}>
              {isFormValid ? 'Start Inspection' : 'Complete All Fields'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  logoContainer: {
    backgroundColor: '#047857',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 15,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f9fafb',
    color: '#111827',
  },
  button: {
    backgroundColor: '#047857',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#d1d5db',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
ENTRY

echo "✅ EntryScreen created"

# Dashboard, GenerateReport, and SavedDrafts screens follow same pattern
# Creating simple placeholders...

cat > src/screens/DashboardScreen.tsx << 'DASH'
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useApp } from '../context/AppContext';

type DashboardScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;
};

export default function DashboardScreen({ navigation }: DashboardScreenProps) {
  const { clearSession, reportsGenerated } = useApp();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.stats}>Reports Generated: {reportsGenerated}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('GenerateReport', {})}
        >
          <Text style={styles.buttonText}>Generate New Report</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SavedDrafts')}
        >
          <Text style={styles.buttonText}>View Saved Drafts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={() => {
            clearSession();
            navigation.replace('Entry');
          }}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
    textAlign: 'center',
  },
  stats: {
    fontSize: 18,
    color: '#6b7280',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#047857',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: '#dc2626',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
DASH

echo "✅ DashboardScreen created"

cat > src/screens/GenerateReportScreen.tsx << 'GENREP'
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function GenerateReportScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Generate Report</Text>
        <Text style={styles.subtitle}>Camera and PDF generation features coming soon</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
});
GENREP

echo "✅ GenerateReportScreen created"

cat > src/screens/SavedDraftsScreen.tsx << 'DRAFTS'
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useApp } from '../context/AppContext';

export default function SavedDraftsScreen() {
  const { drafts } = useApp();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Saved Drafts</Text>
        <Text style={styles.count}>Total drafts: {drafts.length}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
  },
  count: {
    fontSize: 16,
    color: '#6b7280',
  },
});
DRAFTS

echo "✅ SavedDraftsScreen created"

echo ""
echo "═══════════════════════════════════════════"
echo "✅ All screens created successfully!"
echo "═══════════════════════════════════════════"
echo ""
echo "You can now run:"
echo "  cd /tmp/cc-agent/57917751/project/myapp"
echo "  npx expo start"
echo ""
