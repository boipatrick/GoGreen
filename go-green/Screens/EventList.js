import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { events } from '../data/events';
import { UserContext } from '../UserContext';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');
const CARD_HORIZONTAL_PADDING = 20; // Match container padding

export default function EventList({ navigation }) {
  const { currentUser } = useContext(UserContext);

  // You can use a user image if available, or a placeholder avatar
  const avatarSource = currentUser?.avatar
    ? { uri: currentUser.avatar }
    : require('../assets/avatar.png'); // Place a default avatar image in your assets folder

  const renderCarouselItem = ({ item }) => (
    <TouchableOpacity
      style={styles.carouselCard}
      onPress={() => navigation.navigate('EventsScreen', { event: item })}
      activeOpacity={0.9}
    >
      <Image
        source={item.image ? item.image : require('../assets/image-1.png')}
        style={styles.carouselImage}
      />
      <View style={styles.carouselTextContainer}>
        <Text style={styles.carouselTitle}>{item.title}</Text>
        <View style={styles.detailRow}>
          <MaterialIcons name="place" size={18} color="#388e3c" style={styles.detailIcon} />
          <Text style={styles.carouselSub}>{item.location}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="event" size={18} color="#388e3c" style={styles.detailIcon} />
          <Text style={styles.carouselSub}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="account" size={18} color="#388e3c" style={styles.detailIcon} />
          <Text style={styles.carouselSub}>{item.organizer}</Text>
        </View>
        <View style={styles.detailRow}>
          <FontAwesome5 name="leaf" size={16} color="#388e3c" style={styles.detailIcon} />
          <Text style={styles.carouselSub}>{item.credits} credits</Text>
        </View>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigation.navigate('EventsScreen', { event: item })}
          activeOpacity={0.85}
        >
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeBoundary}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.welcome}>
              Welcome{currentUser && currentUser.fullName ? `, ${currentUser.fullName}` : ''}!
            </Text>
            <Text style={styles.subtitle}>
              Ready to make a difference today?
            </Text>
          </View>
          <Image source={avatarSource} style={styles.avatar} />
        </View>
      </View>
      <Text style={styles.header}>Upcoming Events</Text>

      <Carousel
        loop
        width={screenWidth}
        height={370}
        autoPlay={true}
        autoPlayInterval={4000}
        data={events}
        scrollAnimationDuration={1200}
        renderItem={({ item }) => renderCarouselItem({ item })}
        style={styles.carouselContainer}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.95,
          parallaxScrollingOffset: 40,
        }}
        // The card width is screenWidth minus padding on both sides
        pagingEnabled
        snapEnabled
        windowSize={3}
        itemWidth={screenWidth - CARD_HORIZONTAL_PADDING * 2} // This makes the cards narrower
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  welcome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 15,
    color: '#388e3c',
    marginBottom: 18,
    textAlign: 'left',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10, // Reduce from 20 to 10 (or even 6)
  },
  carouselContainer: {
    marginBottom: 12, // Reduce from 24 to 12 (or even 6)
  },
  carouselCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    width: screenWidth - CARD_HORIZONTAL_PADDING * 2, // Now matches container padding
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: 18,
    marginVertical: 10,
  },
  carouselImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  carouselTextContainer: {
    padding: 18,
    alignItems: 'flex-start',
    width: '100%',
  },
  carouselTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 4,
  },
  carouselSub: {
    fontSize: 14,
    color: '#555',
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
  detailsButton: {
    marginTop: 14,
    backgroundColor: '#e53935', // Red color
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 18,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  detailsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Add this for spacing
    marginBottom: 18,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 14,
    backgroundColor: '#c8e6c9',
  },
  welcomeBoundary: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#c8e6c9',
    padding: 18,
    marginBottom: 6, 
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  detailIcon: {
    marginRight: 7,
  },
});
