import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type PreviewScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Preview'>;
};

export default function PreviewScreen({ navigation }: PreviewScreenProps) {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-5">
        <Text className="text-3xl font-bold text-gray-800 mb-2">Report Preview</Text>
        <Text className="text-base text-gray-600 mb-8">Review your generated report</Text>

        <View className="bg-white p-8 rounded-xl min-h-96 justify-center items-center mb-8 shadow-sm">
          <Text className="text-base text-gray-400 text-center">
            Your report preview will appear here
          </Text>
        </View>

        <View className="gap-4">
          <TouchableOpacity
            className="bg-blue-500 px-8 py-4 rounded-lg items-center"
            onPress={() => navigation.navigate('Dashboard')}
          >
            <Text className="text-white text-base font-semibold">Back to Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white border-2 border-blue-500 px-8 py-4 rounded-lg items-center"
            onPress={() => navigation.navigate('GenerateReport', {})}
          >
            <Text className="text-blue-500 text-base font-semibold">Generate New Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
