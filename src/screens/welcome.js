import React, { useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { getAuth } from "firebase/auth";
import ButtonLarge from "../components/buttonLarge";

const Welcome = ({ navigation }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const auth = getAuth();

  const handleNavigation = () => {
    if (auth.currentUser) {
      navigation.replace("Main");
    } else {
      navigation.replace("Login");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/welcome.png")}
      style={styles.backgroundImage}
      onLoadEnd={() => setImageLoaded(true)}
    >
      {imageLoaded ? (
        <View style={styles.container}>
          <View style={styles.font}>
            <Text style={styles.title}>Votre parcours,</Text>
            <Text style={styles.title}>Notre mission.</Text>
          </View>
          <ButtonLarge
            style={styles.bouton}
            title="Commencer"
            onPress={handleNavigation}
          />
        </View>
      ) : (
        <ActivityIndicator size="large" color="#0339C5" /> // Or any other loading indicator
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    bottom: 40,
    left: 0,
    right: 0,
  },
  font: {
    marginBottom: 30,
  },
  title: {
    fontFamily: "Inter-Black",
    color: "white",
    fontSize: 40,
    marginBottom: 20,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center", // Center the loading indicator
    alignItems: "center",
  },
});

export default Welcome;
