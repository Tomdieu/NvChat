import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const InputField = (props) => {
    const {label,leftIcon,rightIcon,containerStyle} = props;
  return (
    <View style={{...styles.containerStyle,...containerStyle}}>
    {label && (<Text>{label}</Text>)}
    <View style={styles.container}>
      {leftIcon && {leftIcon}}
      <TextInput 
        style={styles}
        {...props}
      />
      {rightIcon && {rightIcon}}
    </View>
    </View>
  )
}

export default InputField

const styles = StyleSheet.create({
  containerStyle:{
    marginBottom:5,
    flex:1,
    flexDirection:'row'
  },
  container:{
    flex:1,
    flexDirection:'column',
    gap:2
  }
})