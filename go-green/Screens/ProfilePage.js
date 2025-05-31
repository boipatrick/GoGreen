import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { UserContext } from '../UserContext';

export default function ProfilePage() {
  const { currentUser } = useContext(UserContext);

  // Example level logic based on credits
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
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    backgroundColor: '#c8e6c9',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  level: {
    fontSize: 18,
    color: '#388e3c',
    marginBottom: 30,
  },
  creditsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  creditsLabel: {
    fontSize: 18,
    color: '#555',
    marginRight: 8,
  },
  creditsValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  info: {
    fontSize: 18,
    color: '#888',
  },
});