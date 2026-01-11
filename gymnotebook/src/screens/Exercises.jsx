import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Footer from '../components/footer';


export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
          source={require('../images/gym.jpg')} 
          style={styles.background}
          >
    <View style={styles.container}>
      
      <View style={styles.content}>
        <Text style={styles.text}>Select your split or make one yourself!</Text>
        <Button title="Logout" onPress={() => navigation.navigate('Welcome')} />
      </View>
     
      <Footer />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: 'black',
  },
  content: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
});