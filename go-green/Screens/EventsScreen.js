import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';


export default function EventDetails({ route }) {
  const { event } = route.params;

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
        <Button title="Join Event" onPress={() => alert(`Joined ${event.title}!`)} color="#2E7D32" />
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
