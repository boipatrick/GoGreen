import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';



const AllEvents = () => (
  <View style={styles.scene}>
    <Text>All events listed here</Text>
  </View>
);

const UpcomingEvents = () => (
  <View style={styles.scene}>
    <Text>Upcoming events listed here</Text>
  </View>
);

const PopularEvents = () => (
  <View style={styles.scene}>
    <Text>Popular events listed here</Text>
  </View>
);

export default function MyEvents() {
  const layout = Dimensions.get('window');

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'all', title: 'All Events' },
    { key: 'upcoming', title: 'Upcoming' },
    { key: 'popular', title: 'Popular' },
  ]);

  const renderScene = SceneMap({
    all: AllEvents,
    upcoming: UpcomingEvents,
    popular: PopularEvents,
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
    backgroundColor: '#f5fef8',
    
  },
});
