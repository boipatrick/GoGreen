import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { UserContext } from '../UserContext';

export default function LoginScreen({ navigation }) {
  const { users, setCurrentUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Login Failed', 'Please enter both username and password');
    } else {
      const user = users.find(
        u => u.email === username && u.password === password
      );
      if (user) {
        setCurrentUser(user);
        navigation.replace('MainNav');
      } else {
        Alert.alert('Login Failed', 'Invalid credentials');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        placeholderTextColor="#888"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.85}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.linkRow}>
        <Text style={styles.linkText}>Don't have an account?</Text>
        <TouchableOpacity
          style={styles.signupTapArea}
          onPress={() => navigation.navigate('SignScreen')}
          activeOpacity={0.7}
        >
          <Text style={styles.signupLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafb',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 36,
    color: '#2E7D32',
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 18,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginTop: 6,
    marginBottom: 28,
    width: '100%',
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  linkText: {
    color: '#888',
    fontSize: 15,
    marginRight: 4,
  },
  signupTapArea: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  signupLink: {
    color: '#1B5E20',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
