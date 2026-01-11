// WelcomeScreen.js
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';



export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../images/gym.jpg')} 
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          
          <Text style={styles.title}>Gym Notebook</Text>
          <Text style={styles.subtitle}>Welcome Brother</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.buttonText, styles.buttonOutlineText]}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={() => navigation.navigate('Settings')}>
            <Text style={[styles.buttonText, styles.buttonOutlineText]}>Settings</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
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
});