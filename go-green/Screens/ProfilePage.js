import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { UserContext } from '../UserContext';

export default function ProfilePage({ navigation }) {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const getLevel = (credits = 0) => {
    if (credits >= 100) return 'Level 3: Eco-Champion';
    if (credits >= 50) return 'Level 2: Eco-Warrior';
    return 'Level 1: Eco-Newbie';
  };

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.info}>No user logged in.</Text>
      </View>
    );
  }

  const handleLogout = () => {
    setCurrentUser(null);
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/image-5.png')}
        style={styles.avatar}
      />
      <Text style={styles.name}>{currentUser.fullName}</Text>
      <Text style={styles.level}>{getLevel(currentUser.credits)}</Text>
      <View style={styles.creditsContainer}>
        <Text style={styles.creditsLabel}>Credits:</Text>
        <Text style={styles.creditsValue}>{currentUser.credits || 0}</Text>
      </View>
      <TouchableOpacity
        style={styles.redeemButton}
        onPress={() => {/* Add redeem logic here */}}
        activeOpacity={0.85}
      >
        <Text style={styles.redeemButtonText}>REDEEM CREDITS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.85}>
        <Text style={styles.logoutButtonText}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
    padding: 24,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 28,
    backgroundColor: '#c8e6c9',
    alignSelf: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
    textAlign: 'center',
  },
  level: {
    fontSize: 17,
    color: '#388e3c',
    marginBottom: 8,
    fontWeight: '400',
    textAlign: 'center',
  },
  creditsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 2,
    justifyContent: 'center',
  },
  creditsLabel: {
    fontSize: 16,
    color: '#555',
    marginRight: 6,
    fontWeight: '400',
  },
  creditsValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 24,
    width: '100%',
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 18,
    elevation: 2,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  info: {
    fontSize: 18,
    color: '#888',
  },
  redeemButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 24,
    width: '100%',
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  redeemButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
});