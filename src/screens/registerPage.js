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
    Image // Import the Image component
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

const RegisterPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSignUp = async () => {
        if (!email || !password || !firstName || !lastName) {
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
                routes: [{ name: 'AdditionalInfo' }], // Remplacez 'AdditionalInfo' par la véritable route vers laquelle vous souhaitez naviguer
            });
        } catch (error) {
            Alert.alert("Erreur", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/overlay.png')} // Remplacez par l'image de fond souhaitée
            style={styles.backgroundImage}
            onLoadEnd={() => setImageLoaded(true)}
        >
            {imageLoaded ? (
                <View style={styles.container}>
                    <Image
                        source={require('../../assets/logo.png')} // Remplacez par le chemin de votre logo
                        style={styles.logo}
                    />
                    <Text style={styles.title}>Inscription</Text>
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Prénom</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Votre prénom"
                            value={firstName}
                            onChangeText={setFirstName}
                            autoCapitalize="words"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nom</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Votre nom"
                            value={lastName}
                            onChangeText={setLastName}
                            autoCapitalize="words"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Votre mail"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Mot de passe</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Votre mot de passe"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

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

                    <Text style={styles.termsText}>
                        En vous inscrivant, vous acceptez nos conditions générales et notre politique de confidentialité.
                    </Text>

                    <TouchableOpacity
                        style={styles.linkButton}
                        onPress={() => navigation.navigate('Login')} // Assurez-vous que 'Login' est le nom de la route vers l'écran de connexion
                    >
                        <Text style={styles.linkText}>Déjà inscrit ? Se Connecter</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ActivityIndicator
                    size={'large'}
                    color={'#0339C5'}
                />
            )}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: '80%',
        alignItems: 'center',
        marginTop: 20, // Espace au-dessus du contenu
    },
    logo: {
        width: 120, 
        height: 120, 
        marginBottom: 10, // Logo légèrement descendu
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
        alignItems: 'flex-start',
    },
    label: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
    },
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#fff', 
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20, 
        marginBottom: 10, 
    },
    buttonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'light',
    },
    linkButton: {
        width: '100%',
        alignItems: 'center',
        padding: 10 
    },
    linkText: {
        color: '#fff',
        textDecorationLine: 'underline',
        padding: 20 
    },
    termsText: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 15,
    },
});

export default RegisterPage;
