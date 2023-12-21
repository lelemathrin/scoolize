import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import Nav from "../components/navbar";

const Voeux = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "Prompt-Black", fontSize: 36 }}>Voeux</Text>
      <Nav navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Voeux;
