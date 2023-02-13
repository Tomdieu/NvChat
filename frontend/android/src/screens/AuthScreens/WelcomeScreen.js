import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import Button from '../../components/Button';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome Screen</Text>
      <StatusBar style="auto" />
      <Button style={{backgroundColor:'red',width:'300'}}>Hello</Button>
    </View>
  )
}

export default WelcomeScreen


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  text:{
    fontSize:23
  }
})