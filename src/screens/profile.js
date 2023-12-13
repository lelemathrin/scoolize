import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const Profile = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setUser(user);
            } else {
                // User is signed out
                setUser(null);
                navigation.replace('Login');
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            // After sign out, the onAuthStateChanged listener will handle the redirection
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            {user ? <Text>Welcome, {user.email}</Text> : <Text>Not logged in</Text>}
            <Button 
                title="Log out"
                onPress={handleSignOut}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});

export default Profile;
