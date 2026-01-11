

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import RegisterPage from '../screens/Register'
import SideProfile from '../components/sideprofile';
import ProfilePage from '../screens/Profile';
import WelcomeScreen from '../screens/WelcomeScreen';
import Settings from '../screens/Settings';
import LoginPage from '../screens/LoginPage';
import MusicPlayer from '../screens/MusicPlayer';



const Drawer = createDrawerNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <SideProfile {...props} />}
        drawerPosition="right"
        drawerType="slide"
        screenOptions={{ headerShown: false }}
        drawerStyle={{ width: 250 }}
      >
        <Drawer.Screen name="Welcome" component={WelcomeScreen}/>
        <Drawer.Screen name="Register" component={RegisterPage} />
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfilePage} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="Login" component={LoginPage} />
        <Drawer.Screen name="Music" component={MusicPlayer}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}