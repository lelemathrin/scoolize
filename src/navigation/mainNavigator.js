import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home";
import Profile from "../screens/profile";
import Voeux from "../screens/voeux";
import Chatbot from "../screens/chatbot";

const MainStack = createStackNavigator();

const MainNavigator = () => (
  <MainStack.Navigator 
    screenOptions={{ headerShown: false, animationEnabled: false }}>
    <MainStack.Screen name="Home" component={Home} />
    <MainStack.Screen name="Voeux" component={Voeux} />
    <MainStack.Screen name="Chatbot" component={Chatbot} />
    <MainStack.Screen name="Profile" component={Profile} />
  </MainStack.Navigator>
);

export default MainNavigator;
