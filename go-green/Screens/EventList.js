import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';



const events = [
  {
    id: '1',
    title: 'Beach Cleanup Drive',
    location: 'Diani Beach',
    date: 'June 10, 2025',
  },
  {
    id: '2',
    title: 'Tree Planting Day',
    location: 'Karura Forest',
    date: 'June 15, 2025',
  },
  {
    id: '3',
    title: 'River Awareness Walk',
    location: 'Nairobi River',
    date: 'June 20, 2025',
  },
];

export default function EventList({ navigation }) {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardSub}>📍 {item.location}</Text>
      <Text style={styles.cardSub}>📅 {item.date}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EventDetails', { event: item })}
      >
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  cardSub: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  button: {
    marginTop: 12,
    backgroundColor: '#2E7D32',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
