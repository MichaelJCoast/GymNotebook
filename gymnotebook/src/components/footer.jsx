import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native/types_generated/index';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>Enjoy life while it's still free</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 10,
    width: '95%',
    backgroundColor: 'gray',
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    color: 'white',
  },
});