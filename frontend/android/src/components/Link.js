import { StyleSheet, Text, View } from "react-native";
import React from "react";

import {colors} from '../constants'

const Link = (props) => {
  const { children } = props;
  return <Text style={styles.link} {...props}>{children}</Text>;
};

export default Link;

const styles = StyleSheet.create({
    link:{
        color:colors.blue.shades.light
    }
});
