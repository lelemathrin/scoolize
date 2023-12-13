import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';

const Welcome = ({ navigation }) => {
    const auth = getAuth();

    const handleNavigation = () => {
        if (auth.currentUser) {
            // User is signed in, navigate to Home
            navigation.replace('Home');
        } else {
            // No user is signed in, navigate to Login
            navigation.replace('Login');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the App</Text>
            <Button 
                title="Get Started" 
                onPress={handleNavigation} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    // Add more styling as needed
});

export default Welcome;
