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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

const RegisterPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleSignUp = async () => {
        if (!email || !password) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs.");
            return;
        }
        setIsLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userId = userCredential.user.uid;
            // Navigate to the next screen or perform additional setup
            navigation.reset({
                index: 0,
                routes: [{ name: 'Form' }], // Replace 'Form' with the actual route you wish to navigate to
            });
        } catch (error) {
            Alert.alert("Erreur", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/overlay.png')} // Replace with your desired background image
            style={styles.backgroundImage}
            onLoadEnd={() => setImageLoaded(true)}
        >
            {imageLoaded ? (
                <View style={styles.container}>
                    <Image
                        source={require('../../assets/logo.png')} // Replace with your logo image path
                        style={styles.logo}
                    />
                    <Text style={styles.title}>Créer un compte</Text>
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
                        onPress={handleSignUp}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#FFF" />
                        ) : (
                            <Text style={styles.buttonText}>S’inscrire</Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.linkButton}
                        onPress={() => navigation.navigate('Login')} // Make sure 'Login' is your login screen's route name
                    >
                        <Text style={styles.linkText}>Déjà inscrit ? Se Connecter</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ActivityIndicator
                    size={'large'}
                    color={'#0339C5'} />
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
        padding: 10 
    },
    linkText: {
        color: '#fff',
        textDecorationLine: 'underline',
        position: 'absolute',
        bottom: 5, 
        padding: 20 
    },
});
export default RegisterPage;