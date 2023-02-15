import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
    <StatusBar style="auto"/>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the Chat App!</Text>
        <Text style={styles.subtitle}>
          Start chatting with your friends today!
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
      <Text textAlign="center">Powered by @ivantom</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
    padding: 2,
    paddingBottom:10,
    paddingLeft:5,
    paddingRight:5
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: "#333",
  },
  button: {
    padding: 12,
    backgroundColor: "#333",
    borderRadius: 4,
    marginTop: 24,
    width: "100%",
    marginBottom:10
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
});

export default WelcomeScreen;
