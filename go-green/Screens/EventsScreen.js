import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';
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
    <ScrollView style={styles.container}>
      
      <Image source={event.image} style={styles.image} />

     
      <Text style={styles.heading}>{event.title}</Text>

      
      <View style={styles.infoGroup}>
        <Text style={styles.label}>📅 Date:</Text>
        <Text style={styles.value}>{event.date}</Text>
      </View>

      <View style={styles.infoGroup}>
        <Text style={styles.label}>📍 Location:</Text>
        <Text style={styles.value}>{event.location}</Text>
      </View>

      <View style={styles.infoGroup}>
        <Text style={styles.label}>🙋 Organizer:</Text>
        <Text style={styles.value}>{event.organizer}</Text>
      </View>

      <View style={styles.infoGroup}>
        <Text style={styles.label}>💳 Credits:</Text>
        <Text style={styles.value}>{event.credits}</Text>
      </View>

     
      <Text style={styles.description}>
        {event.description}
      </Text>
      <View style={styles.buttonWrapper}>
        <Button title="Join Event" onPress={handleJoinEvent} color="#2E7D32" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5fef8',
    padding: 20,
  },
  image: {
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'cover',
    width: '100%',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  infoGroup: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    fontWeight: '600',
    width: 100,
  },
  value: {
    flex: 1,
  },
  description: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 22,
    color: '#444',
  },
  buttonWrapper: {
    marginTop: 30,
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    overflow: 'hidden',
  },
});
