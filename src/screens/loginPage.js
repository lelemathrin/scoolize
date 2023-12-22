import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    ImageBackground,
    Image 
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

const LoginPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs.");
            return;
        }

        try {
            setIsLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('from'); // Redirection après connexion réussie
        } catch (error) {
            Alert.alert("Erreur de Connexion", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/overlay.png')} // Your image background
            style={styles.backgroundImage}
            onLoadEnd={() => setImageLoaded(true)}
        >
            {imageLoaded ? (
                <View style={styles.container}>
                    <Image
                        source={require('../../assets/logo.png')} // Replace with your logo path
                        style={styles.logo}
                    />
                    <Text style={styles.title}>Connexion</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Votre mail"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Votre mot de passe"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#FFF" />
                        ) : (
                            <Text style={styles.buttonText}>Se Connecter</Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.linkButton}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.linkText}>Pas encore de compte?Créer un compte</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ActivityIndicator size={'large'} color={'#0339C5'} />
            )}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start', 
        paddingTop: 135, 
        paddingHorizontal: 20, 
    },
    logo: {
        width: 120, 
        height: 120,
        marginBottom: 30, 
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#fff', 
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60, 
        marginBottom: 1, 
    },
    buttonText: {
        color: '#000000', 
        fontSize: 16,
        fontWeight: 'light',
    },
    linkButton: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
        padding: 10 ,
    },
    linkText: {
        color: '#fff',
        textDecorationLine: 'underline',
        bottom: 5, 
        padding: 20 ,
        textAlign: 'center',

    },
});

export default LoginPage;