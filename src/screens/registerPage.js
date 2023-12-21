import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useUserContext } from '../contexts/userContext';
import { Timestamp } from 'firebase/firestore';

const RegisterPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { setUserId } = useUserContext();
    const firestore = getFirestore(); // Get the Firestore instance

    const handleSignUp = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Email and password must not be empty");
            return;
          }

        setIsLoading(true);
    
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;
    
            // Use Firebase's Timestamp for the current time
            const creationTime = Timestamp.now();
    
            // Create a document in Firestore in the "users" collection with the userId
            await setDoc(doc(firestore, "users", userId), {
                email: email,
                firstName: "",
                lastName: "",
                age: "",
                currentClass: "",
                specialty: "",
                school: "",
                creationTime: creationTime 
            });
    
            // Set the user ID in the context here
            setUserId(userId);
    
            // Navigate to the 'AdditionalInfoScreen' screen
            navigation.reset({
                index: 0,
                routes: [{ name: 'AdditionalInfo' }],
            });
    
            // Prevent further actions until navigation is complete
            return;
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setIsLoading(false); // Ensure loading is false in case of success or error
        }
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
                onPress={() => navigation.navigate('Login')} 
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



