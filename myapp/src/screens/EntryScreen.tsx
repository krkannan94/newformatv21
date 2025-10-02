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
