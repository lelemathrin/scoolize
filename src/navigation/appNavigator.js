import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../screens/loginPage'; // Importez votre page de connexion
import RegisterPage from '../screens/registerPage';
import Home from '../screens/home';
import Profile from '../screens/profile';
import Welcome from '../screens/welcome';
import FormNavigator from './formNavigator';
// Importez d'autres écrans au besoin

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={user ? "Home" : "Welcome"}>
          {user ? (
            // User is signed in, 'Welcome' screen is not in the stack
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Form" component={FormNavigator} />
              {/* other screens for logged-in users */}
            </>
          ) : (
            // No user is signed in
            <>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Login" component={LoginPage} />
              <Stack.Screen name="Register" component={RegisterPage} />
              {/* other public screens */}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
};


export default AppNavigator;
