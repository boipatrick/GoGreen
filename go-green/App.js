import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen'; 
import LoginScreen from './Screens/LoginScreen';
import MainNav from './navigation/MainNav';
import EventsScreen from './Screens/EventsScreen'
import MyEvents from './Screens/MyEvents';
import ProfilePage from './Screens/ProfilePage';
import SignScreen from './Screens/SignScreen'; 
import { UserProvider } from './UserContext'; 





import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
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
              options={{ headerShown: true, title: "Event Details" }}
            />
          
          </Stack.Navigator>
          <StatusBar style="auto" />
      </UserProvider>
    </NavigationContainer>
  );
}
