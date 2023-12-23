// ButtonLarge.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ButtonLarge = ({ onPress, title, buttonColor = '#176CEC', textColor = 'white' }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: buttonColor }]}>
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 300,
    borderRadius: 100,
    alignItems: "center",
    paddingVertical: 15,
  },
  text: {
    fontFamily: "Prompt-Regular",
    fontSize: 18,
  },
});

export default ButtonLarge;