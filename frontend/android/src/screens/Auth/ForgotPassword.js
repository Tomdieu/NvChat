import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import Button from '../../components/Button'

const ForgotPassword = () => {
  return (
    <View style={styles.container}>
      <Text>Forgotten Password</Text>
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <View>
            <TextInput placeholder='username or email' />
            <Button>Continue</Button>
        </View>
      </View>
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:2
    }
})