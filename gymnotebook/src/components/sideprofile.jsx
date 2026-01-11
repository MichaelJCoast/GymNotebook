import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfilePage from '../screens/Profile';

// SideProfile should be a presentational component displayed inside screens.
// The Drawer navigator must be defined at the app/navigation level (e.g. in AppNavigator).
export default function SideProfile({ onClose, navigation: drawerNavigation }) {
  const navigation = useNavigation();

  const handleClose = () => {
    if (typeof onClose === 'function') return onClose();
    // when used as drawerContent, navigation has closeDrawer()
    if (drawerNavigation && typeof drawerNavigation.closeDrawer === 'function') {
      return drawerNavigation.closeDrawer();
    }
    // fallback
    if (navigation && typeof navigation.closeDrawer === 'function') {
      return navigation.closeDrawer();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text 
        style={styles.title}>Perfil do Utilizador
        </Text>
        </TouchableOpacity>
      <TouchableOpacity onPress={handleClose}>
        <Text style={styles.close}>✖</Text>
      </TouchableOpacity>
      
      <Text style={styles.item}>Niggus Maximus</Text>
      <Text style={styles.item}>Nível de Gym: Macaco</Text>
      <Text style={styles.item}>Status: Online</Text>
     
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
          handleClose();
        }}
      >
        <Text style={styles.item}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 20,
  },
  close: {
    color: '#fff',
    fontSize: 18,
    alignSelf: 'flex-end',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 15,
  },
  item: {
    color: '#ccc',
    marginBottom: 10,
  },
});
 
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button } from 'react-native/types_generated/index';

const Drawer = createDrawerNavigator();