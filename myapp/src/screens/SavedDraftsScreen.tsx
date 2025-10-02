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
