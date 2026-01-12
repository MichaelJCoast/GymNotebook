import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import {Ionicons} from 'react-native-vector-icons';


export default function Login() {
  const navigation = useNavigation(); 

  return (
    <ImageBackground
          source={require('../images/gym.jpg')} 
          style={styles.background}
        > 
        <Text style={styles.title}>Hello!</Text>
    <View style={styles.container}>
           
      <TextInput title="Email" placeholder="Email" placeholderTextColor="white" style={styles.input} />
      <TextInput title="Password" placeholder="Password"  placeholderTextColor="white" secureTextEntry={true} style={styles.input} />
      
      <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('Home')}>
                  <Text style={[styles.buttonText]}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Don't have an account?</Text>
    <TouchableOpacity style={[styles.secondarybutton, styles.buttonOutline]} onPress={() => navigation.navigate('Register')}>
                  <Text style={[styles.buttonText, styles.buttonOutlineText]}>Register</Text>
      </TouchableOpacity>
       <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('Music')}>
                  <Text style={[styles.buttonText]}>Music</Text>
      </TouchableOpacity>
     
    </View>
    </ImageBackground>
  );
}

let login = false

if (login === true){
  
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
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
    marginTop: 70,
  },
  text:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 70,
  },
  buttonsContainer: {
    marginBottom: 50,
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
  secondarybutton: {
    backgroundColor: '#FF9704', // 
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 12,
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
  input: {
  width: '100%',
  height: 50,
  backgroundColor: 'rgba(255,255,255,0.25)',
  borderRadius: 30,
  paddingHorizontal: 20,
  fontSize: 16,
  color: '#fff',
  marginVertical: 10,
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.6)',
},

});