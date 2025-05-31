import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen'; // 
import LoginScreen from './Screens/LoginScreen';
import MainNav from './navigation/MainNav';
import EventsScreen from './Screens/EventsScreen'
import MyEvents from './Screens/MyEvents';
import SignScreen from './Screens/SignScreen'; // Assuming you have a SignScreen component
import { UserProvider } from './UserContext'; // Add this import





import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen
              name="Welcome"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignScreen"
              component={SignScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MainNav"
              component={MainNav}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EventsScreen"
              component={EventsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MyEvents"
              component={MyEvents}
              options={{ headerShown: false }}
            />
            
            
           
            {/* Future screens like Auth will go here */}
          </Stack.Navigator>
          <StatusBar style="auto" />
        </SafeAreaView>
      </UserProvider>
    </NavigationContainer>
  );
}
