import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppNavigator from './src/navigation/appNavigator';
import { UserProvider } from './src/contexts/userContext';

export default function App() {
  return (
    <UserProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </UserProvider>
  );
}
