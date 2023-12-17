import * as Font from "expo-font";
import { View, Text, Button, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/navigation/appNavigator";
import { UserProvider } from "./src/contexts/userContext";

export default function App() {
  const [fontsLoaded, fontError] = Font.useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
    "Prompt-Black": require("./assets/fonts/Prompt-Black.ttf"),
    "Prompt-Regular": require("./assets/fonts/Prompt-Regular.ttf"),
    "Helvetica-Regular": require("./assets/fonts/Helvetica.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <UserProvider>
        <AppNavigator />
        <StatusBar style="auto" />
      </UserProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
