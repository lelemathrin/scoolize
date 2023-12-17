// ButtonLarge.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ButtonLarge = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={[styles.text]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#176CEC",
    width: 300,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  text: {
    fontFamily: "Prompt-Regular",
    color: "white",
    fontSize: 18,
  },
});

export default ButtonLarge;
