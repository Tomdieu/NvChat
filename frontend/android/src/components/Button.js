import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const Button = (props) => {
  const { children, style, color = "#000"} = props;
  return (
    <TouchableOpacity {...props} style={[styles.button, style]}>
      <Text style={[styles.text, color]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0000ff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    textAlign:'center',
    margin:3
  },
});
