import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import EventList from "../Screens/EventList";
import MyEvents from '../Screens/MyEvents'
import ProfilePage from "../Screens/ProfilePage";
import AIChat from "../Screens/AIChat";
import { MaterialCommunityIcons } from '@expo/vector-icons';



const BottomTab = createBottomTabNavigator();

export default function MainNav() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => {
        let iconName;
        return {
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "EventList") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "MyEvents") {
              iconName = focused ? "calendar" : "calendar-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "account" : "account-outline";
             } else if (route.name == "AIChat"){
              iconName = 'chat'
            }

            return (
              <MaterialCommunityIcons name={iconName} size={32} color={color} />
            );
          },
          tabBarActiveTintColor: "#2E7D32",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#e0e0e0",
            paddingBottom: 5,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
          },
          headerShown: false,
          headerStyle: {
            height: 35, 
            backgroundColor: "#fff", 
            elevation: 0, 
            shadowOpacity: 0,
          },
        };
      }}
    >
      <BottomTab.Screen
        name="EventList"
        component={EventList}
        options={{ title: "Home" }}
      />
      <BottomTab.Screen
        name="MyEvents"
        component={MyEvents}
        options={{ title: "My Events"}}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfilePage}
        options={{ title: "Profile"}}
      />
      <BottomTab.Screen
        name="AIChat"
        component={AIChat}
        options={{ title: "Chat"}}
      />
       
      
      
    </BottomTab.Navigator>
  );
}
