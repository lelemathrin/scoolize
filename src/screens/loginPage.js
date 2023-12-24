import React, { useState, useRef } from 'react';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LoginPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Create refs
    const emailRef = useRef();
    const passwordRef = useRef();

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const getPasswordIcon = () => {
        return showPassword
            ? require('../../assets/eye.png')
            : require('../../assets/eye-off.png');
    };

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs.");
            return;
        }

        try {
            setIsLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('Main'); // Redirection après connexion réussie
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
                <>
                <KeyboardAwareScrollView
                extraScrollHeight={20}>

                <View style={styles.container}>
                    <Image
                        source={require('../../assets/logo.png')} // Replace with your logo path
                        style={styles.logo}
                    />
                    <Text style={styles.title}>Connexion</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>E-mail</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Votre mail"
                            placeholderTextColor={'grey'}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            textContentType='emailAddress'
                            returnKeyType='next'
                            onSubmitEditing={() => passwordRef.current.focus()}
                            ref={emailRef}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Mot de passe</Text>
                        <View style={styles.passwordInput}>
                            <TextInput
                                style={styles.passwordTextInput}
                                placeholder="Votre mot de passe"
                                placeholderTextColor={'grey'}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                returnKeyType='done'
                                ref={passwordRef}
                            />
                            <TouchableOpacity onPress={toggleShowPassword}>
                                <Image
                                    source={getPasswordIcon()}
                                    style={styles.eyeIcon}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#000" />
                        ) : (
                            <Text style={styles.buttonText}>Se Connecter</Text>
                        )}
                    </TouchableOpacity>
                </View>
                </KeyboardAwareScrollView>

                    <TouchableOpacity
                        style={styles.linkButton}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.linkText}>Pas encore de compte ?</Text>
                    </TouchableOpacity>
                </>
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
        backgroundColor: '#0339C5', // Couleur d'arrière-plan ajoutée
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 100,
        paddingHorizontal: 25,
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
        fontFamily: 'Prompt-Bold',
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
        borderRadius: 5,
        fontSize: 16,
    },
    passwordInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        fontSize: 16,
    },
    passwordTextInput: {
        flex: 1,
        padding: 15,
    },
    eyeIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    button: {
        width: 320,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    buttonText: {
        color: '#000000',
        fontSize: 18,
        fontFamily: 'Prompt-Regular',
    },
    linkButton: {
        flex: 1,
        alignItems: 'center',
    },
    linkText: {
        position: 'absolute', // Position absolutely
        bottom: 50, // At the bottom of the nearest positioned ancestor
        color: '#fff',
        textDecorationLine: 'underline',
        textAlign: 'center',
        width: '100%', // Take up the full width
      },
});

export default LoginPage;
