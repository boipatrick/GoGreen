import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { UserContext } from '../UserContext';

export default function LoginScreen({ navigation }) {
  const { users, setCurrentUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Login Failed', 'Please enter both username and password');
    } else {
      // Check if user exists
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
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Text>Don't have an Account? </Text>
        <Text
          style={{ color: '#2E7D32', fontWeight: 'bold' }}
          onPress={() => navigation.navigate('SignScreen')}
        >
          Sign Up
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#2E7D32',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    fontSize: 16,
  },
});
