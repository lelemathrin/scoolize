import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../screens/loginPage'; // Importez votre page de connexion
import RegisterPage from '../screens/registerPage';
import Welcome from '../screens/welcome';
import FormNavigator from './formNavigator';
import MainNavigator from './mainNavigator';
import AdditionalInfoScreen from '../screens/additionalInfoScreen';

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
			<Stack.Navigator initialRouteName='AdditionalInfo' screenOptions={{ headerShown: false }}>
				<Stack.Screen
					name='Welcome'
					component={Welcome}
				/>
				<Stack.Screen
					name='Login'
					component={LoginPage}
				/>
				<Stack.Screen
					name='Register'
					component={RegisterPage}
				/>
				<Stack.Screen
					name='AdditionalInfo'
					component={AdditionalInfoScreen}
				/>
				<Stack.Screen
					name='Form'
					component={FormNavigator}
				/>
				<Stack.Screen
					name='Main'
					component={MainNavigator}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;
