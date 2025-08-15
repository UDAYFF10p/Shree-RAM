import app from "./firebase";
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [theme, setTheme] = useState('hindu'); // default theme

  const styles = theme === 'hindu' ? hinduStyles : darkPurpleStyles;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shree RAM</Text>
      <Button
        title={`Switch to ${theme === 'hindu' ? 'Dark Purple' : 'Hindu'} Theme`}
        onPress={() => setTheme(theme === 'hindu' ? 'dark' : 'hindu')}
        color={theme === 'hindu' ? '#ff9933' : '#800080'}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const hinduStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8dc', // light saffron
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff9933', // saffron orange
    marginBottom: 20,
  },
});

const darkPurpleStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a001a', // dark purple
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#cc99ff', // neon purple
    marginBottom: 20,
  },
});
