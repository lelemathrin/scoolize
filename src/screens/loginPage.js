import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import firebase from '../services/firebaseConfig';
import { auth } from '../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
          Alert.alert("Erreur", "Veuillez remplir tous les champs.");
          return;
        }
      
        try {
          setIsLoading(true);
          await signInWithEmailAndPassword(auth, email, password);
          // Redirection après connexion réussie
          navigation.navigate('Home');
        } catch (error) {
          Alert.alert("Erreur de Connexion", error.message);
        } finally {
          setIsLoading(false);
        }
      };      

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connexion</Text>
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
                title={isLoading ? 'Connexion...' : 'Se Connecter'}
                onPress={handleLogin}
                disabled={isLoading}
            />
            <Button 
                title="Créer un compte"
                onPress={() => navigation.navigate('Register')}
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

export default LoginPage;
