import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/image-1.png')} style={styles.logo} />
      <Text style={styles.title}>GreenConnect</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Welcome</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E8F5E9',
  },
  logo: {
    width: 120, height: 120, marginBottom: 20,
  },
  title: {
    fontSize: 28, fontWeight: 'bold', marginBottom: 40, color: '#2E7D32',
  },
  button: {
    backgroundColor: '#2E7D32', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25,
  },
  buttonText: {
    color: '#fff', fontSize: 16, fontWeight: '600',
  },
});

export default HomeScreen;
