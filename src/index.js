import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native'

export default function App() {

  return (
    <>
    <StatusBar backgroundColor='#7159c1' barStyle='light-content' />
    <View style={styles.container} >
      <Text style={styles.text} >
        Hello Word
      </Text>
    </View>
    </>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#7159c1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold'
  }

})