import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const RegisterPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = async () => {
        setIsLoading(true); // Set loading to true at the start of the process
    
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Handle the success scenario
            // Reset navigation to Form 
            navigation.reset({
                index: 0,
                routes: [{ name: 'Form' }],
            });
        } catch (error) {
            Alert.alert("Error", error.message);
            setIsLoading(false); // Set loading to false if there's an error
        }
    
        // If navigation does not occur in try block, reset loading state
        // Remove the line below if navigation is handled inside the try block
        setIsLoading(false);
    };
        

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Créer un compte</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button 
                title={isLoading ? 'Création du compte...' : 'Créer un compte'}
                onPress={handleSignUp}
                disabled={isLoading}
            />
            <Button 
                title="Se connecter"
                onPress={() => navigation.navigate('Login')} // Replace 'SignUp' with your sign-up screen's route name
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
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default RegisterPage;



