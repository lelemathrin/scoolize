import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


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
                navigation.navigate('Login');
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <Text>Home</Text>
            {user ? <Text>Bienvenue, {user.email}</Text> : <Text>Non connecté</Text>}
            <Button 
                title="Profil"
                onPress={() => navigation.navigate('Profile')}
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

export default Home;
