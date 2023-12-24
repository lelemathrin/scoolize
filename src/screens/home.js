import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ButtonLarge from "../components/buttonLarge";
import Nav from "../components/navbar";

const Home = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
        navigation.navigate("Login");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "Prompt-Black", fontSize: 36 }}>Home</Text>
      {user ? <Text>Bienvenue, {user.email}</Text> : <Text>Non connecté</Text>}
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

export default Home;