import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { UserContext } from '../UserContext';
import { useNavigation } from '@react-navigation/native';

export default function MyEvents() {
  const navigation = useNavigation();
  const { currentUser } = useContext(UserContext);
  const myEvents = currentUser?.myEvents || [];
  const layout = Dimensions.get('window');

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'all', title: 'All Events' },
    { key: 'upcoming', title: 'Upcoming' },
  ]);


  const AllEvents = () => (
    <View style={styles.scene}>
      {myEvents.length === 0 ? (
        <Text style={styles.empty}>You haven't joined any events yet.</Text>
      ) : (
        <FlatList
          data={myEvents}
          keyExtractor={item => item.title}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
           
              <View style={styles.headerSection}>
                <Text style={styles.headerIcon}>🌱</Text>
                <Text style={styles.headerLabel}>Other</Text>
              </View>
              
              <View style={styles.detailsSection}>
                <View style={styles.badgeRow}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.badgeIcon}>🌱</Text>
                    <Text style={styles.badgeText}>Other</Text>
                  </View>
                  <View style={styles.pointsBadge}>
                    <Text style={styles.pointsText}>+{item.credits || 0} pts</Text>
                  </View>
                </View>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.eventSubtitle}>{item.description}</Text>
              </View>
           
              <View style={styles.metaRow}>
                <View style={styles.metaColumn}>
                  <Text style={styles.metaItem}>⏰ {item.date}</Text>
                  <Text style={styles.metaItem}>📍 {item.location}</Text>
                  <Text style={styles.metaItem}>👤 {item.organizer}</Text>
                  
                </View>
              </View>
             
              
             
              <View style={styles.ctaRow}>
                <TouchableOpacity
                  style={styles.ctaButtonOutline}
                  onPress={() => navigation.navigate('EventsScreen', { event: item })}
                >
                  <Text style={styles.ctaButtonOutlineText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.ctaButtonDelete}
                  onPress={() => {
                   
                    const updatedEvents = myEvents.filter(e => e.title !== item.title);
                    
                    currentUser.myEvents = updatedEvents;
                   
                    if (typeof setCurrentUser === 'function') setCurrentUser({ ...currentUser, myEvents: updatedEvents });
                  }}
                >
                  <Text style={styles.ctaButtonDeleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );

  
  const UpcomingEvents = () => (
    <View style={styles.scene}>
      <Text>Upcoming events listed here</Text>
    </View>
  );

  const renderScene = SceneMap({
    all: AllEvents,
    upcoming: UpcomingEvents,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: '#2E7D32' }}
          style={{ backgroundColor: '#000' }}
          labelStyle={{ color: '#37c871', fontWeight: 'bold' }}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9', 
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginBottom: 20,
    marginTop: 20,
    width: 340,
    alignSelf: 'center',
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 10,
  },
  headerIcon: {
    fontSize: 36,
    color: '#37c871',
  },
  headerLabel: {
    color: '#37c871',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 2,
  },
  detailsSection: {
    marginBottom: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a0f5de',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeIcon: {
    marginRight: 4,
    fontSize: 16,
  },
  badgeText: {
    color: '#1b5e20',
    fontWeight: 'bold',
    fontSize: 13,
  },
  pointsBadge: {
    backgroundColor: '#a0f5de',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  pointsText: {
    color: '#1b5e20',
    fontWeight: 'bold',
    fontSize: 13,
  },
  eventTitle: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 4,
    marginBottom: 2,
  },
  eventSubtitle: {
    color: '#333', 
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop: 6,
  },
  metaColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 8,
    marginTop: 6,
  },
  metaItem: {
    color: '#222', 
    fontWeight: 'bold', 
    fontSize: 13,
  },
  
  ctaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  ctaButtonOutline: {
    borderColor: '#37c871',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 18,
    backgroundColor: 'transparent',
  },
  ctaButtonOutlineText: {
    color: '#37c871',
    fontWeight: 'bold',
    fontSize: 15,
  },
  ctaButtonFilled: {
    backgroundColor: '#a259f7',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginLeft: 10,
  },
  ctaButtonFilledText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  ctaButtonDelete: {
    backgroundColor: '#e57373',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginLeft: 10,
  },
  ctaButtonDeleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  empty: { fontSize: 18, color: '#888', textAlign: 'center', marginTop: 40 },
});