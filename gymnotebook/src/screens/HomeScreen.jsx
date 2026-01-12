import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/footer';
import Ionicons from 'react-native-vector-icons/Ionicons';



export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
          source={require('../images/gym.jpg')} 
          style={styles.background}
          >
        <TouchableOpacity
  onPress={() => navigation.openDrawer()}  
  style={{ position: 'absolute', top: 40, left: 20 }}
>
  <Ionicons name="person-circle-outline" size={36} color="#fff" />
</TouchableOpacity>

    <View style={styles.container}>
              <Text style={styles.title}>Bem-vindo amigo, estás no sítio certo!</Text>

      <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('Welcome')}>
                        <Text style={[styles.buttonText]}>Logout</Text>
      </TouchableOpacity>
     
      <Footer />
    </View>
        </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    color: 'white',
    textAlign: 'center',
    marginTop: 60,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: '#FF9704', // 
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 12,
    width: '75%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});