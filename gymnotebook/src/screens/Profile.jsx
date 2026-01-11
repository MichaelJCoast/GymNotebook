import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import SideProfile from '../components/sideprofile';


export default function ProfilePage() {
  const navigation = useNavigation(); 

  return (
     <ImageBackground
              source={require('../images/gym.jpg')} 
              style={styles.background}
              >
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao seu perfil.</Text>    
      <Text style={styles.subtitle}>Queres consultar o teu IMC?</Text>
     
    
     
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 10,
    marginLeft: 45,
  },
  buttonsContainer: {
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#FF9704', // 
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#fff',
  },
  buttonOutlineText: {
    color: '#fff',
  },
  input:{
    height: 40,
  }
});