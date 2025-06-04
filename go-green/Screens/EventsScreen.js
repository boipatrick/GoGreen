import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { UserContext } from '../UserContext';

export default function EventDetails({ route }) {
  const { event } = route.params;
  const { currentUser, setCurrentUser, users, setUsers } = useContext(UserContext);

  const handleJoinEvent = () => {
    if (currentUser.myEvents && currentUser.myEvents.some(e => e.title === event.title)) {
      alert('You have already joined this event.');
      return;
    }

    const updatedUser = {
      ...currentUser,
      myEvents: [...(currentUser.myEvents || []), event],
      credits: Number(currentUser.credits || 0) + Number(event.credits || 0),
    };

    setCurrentUser(updatedUser);

    const updatedUsers = users.map(u =>
      u.email === updatedUser.email ? updatedUser : u
    );
    setUsers(updatedUsers);

    alert(`Joined ${event.title}!`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E8F5E9' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={event.image} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.heading}>{event.title}</Text>

          <View style={styles.infoGroup}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{event.date}</Text>
          </View>
          <View style={styles.infoGroup}>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>{event.location}</Text>
          </View>
          <View style={styles.infoGroup}>
            <Text style={styles.label}>Organizer</Text>
            <Text style={styles.value}>{event.organizer}</Text>
          </View>
          <View style={styles.infoGroup}>
            <Text style={styles.label}>Credits</Text>
            <Text style={styles.value}>{event.credits}</Text>
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{event.description}</Text>

          <TouchableOpacity style={styles.ctaButton} onPress={handleJoinEvent} activeOpacity={0.85}>
            <Text style={styles.ctaButtonText}>JOIN EVENT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E8F5E9',
    paddingBottom: 32,
  },
  image: {
    width: '100%',
    height: 220,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 24,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 18,
    textAlign: 'left',
  },
  infoGroup: {
    marginBottom: 18,
  },
  label: {
    fontWeight: 'bold',
    color: '#2E7D32',
    fontSize: 16,
    marginBottom: 4,
  },
  value: {
    color: '#222',
    fontSize: 16,
    marginBottom: 2,
    fontWeight: '500',
    marginLeft: 2,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#2E7D32',
    fontSize: 16,
    marginTop: 18,
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#444',
    marginBottom: 28,
  },
  ctaButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    elevation: 2,
    alignSelf: 'center',
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 0.5,
  },
});
