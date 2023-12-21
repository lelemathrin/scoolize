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
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  text: {
    fontFamily: "Prompt-Regular",
    fontSize: 18,
  },
});

export default ButtonLarge;