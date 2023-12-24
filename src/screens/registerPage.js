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
	Image,
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { auth } from '../services/firebaseConfig';
import { Timestamp } from 'firebase/firestore';
import { useUserContext } from '../contexts/userContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const RegisterPage = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const { setUserId } = useUserContext();
	const firestore = getFirestore();

    // Create refs
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

	const handleSignUp = async () => {
		if (!email || !password || !firstName || !lastName) {
			Alert.alert('Error', 'Veuillez remplir tout les champs.');
			return;
		}

		setIsLoading(true);

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const userId = userCredential.user.uid;

			// Use Firebase's Timestamp for the current time
			const creationTime = Timestamp.now();

			// Create a document in Firestore in the "users" collection with the userId
			await setDoc(doc(firestore, 'users', userId), {
				email: email,
				firstName: firstName,
				lastName: lastName,
				age: '',
				currentClass: '',
				specialty: '',
				school: '',
				creationTime: creationTime,
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
			Alert.alert('Error', error.message);
		} finally {
			setIsLoading(false); // Ensure loading is false in case of success or error
		}
	};

	return (
		<ImageBackground
			source={require('../../assets/overlay.png')} // Remplacez par l'image de fond souhaitée
			style={styles.backgroundImage}
			onLoadEnd={() => setImageLoaded(true)}
			>
			{imageLoaded ? (
				<>
				<TouchableOpacity 
					activeOpacity={1}
					style={styles.arrowContainer}
				    onPress={() => navigation.goBack()} // Go to the previous page in the stack when pressed
					>
					<Image
						source={require('../../assets/arrow.png')} // Remplacez par le chemin de votre logo
						style={styles.arrow}
					/>
				</TouchableOpacity>
                <KeyboardAwareScrollView
                    extraScrollHeight={20}>
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
									placeholderTextColor={'grey'}
									placeholder='Votre prénom'
									value={firstName}
									onChangeText={setFirstName}
									autoCapitalize='words'
                                    textContentType='givenName' // For first name
                                    returnKeyType='next'
                                    onSubmitEditing={() => lastNameRef.current.focus()}
                                    ref={firstNameRef}
								/>
							</View>

							<View style={styles.inputContainer}>
								<Text style={styles.label}>Nom</Text>
								<TextInput
									style={styles.input}
									placeholderTextColor={'grey'}
									placeholder='Votre nom'
									value={lastName}
									onChangeText={setLastName}
									autoCapitalize='words'
                                    textContentType='familyName' // For last name
                                    returnKeyType='next'
                                    onSubmitEditing={() => emailRef.current.focus()}
                                    ref={lastNameRef}								
                                />
							</View>

							<View style={styles.inputContainer}>
								<Text style={styles.label}>Email</Text>
								<TextInput
									style={styles.input}
									placeholderTextColor={'grey'}
									placeholder='Votre mail'
									value={email}
									onChangeText={setEmail}
									keyboardType='email-address'
									autoCapitalize='none'
                                    textContentType='emailAddress' // For email
                                    returnKeyType='next'
                                    onSubmitEditing={() => passwordRef.current.focus()}
                                    ref={emailRef}
                                />
							</View>

							<View style={styles.inputContainer}>
								<Text style={styles.label}>Mot de passe</Text>
								<TextInput
									style={styles.input}
									placeholderTextColor={'grey'}
									placeholder='Votre mot de passe'
									value={password}
									onChangeText={setPassword}
									secureTextEntry
                                    textContentType='newPassword'
                                    returnKeyType='done'
                                    ref={passwordRef}                            
								/>
							</View>

							<TouchableOpacity
								style={styles.button}
								onPress={handleSignUp}
								disabled={isLoading}>
								{isLoading ? (
									<ActivityIndicator
										size='small'
										color='#000'
									/>
								) : (
									<Text style={styles.buttonText}>S’inscrire</Text>
								)}
							</TouchableOpacity>

							<Text style={styles.termsText}>
								En vous inscrivant, vous acceptez nos conditions générales et
								notre politique de confidentialité.
							</Text>

							<TouchableOpacity
								style={styles.linkButton}
								onPress={() => navigation.navigate('Login')} // Assurez-vous que 'Login' est le nom de la route vers l'écran de connexion
							>
								<Text style={styles.linkText}>Déjà inscrit ? Se Connecter</Text>
							</TouchableOpacity>
						</View>
				</KeyboardAwareScrollView>
				</>
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
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		backgroundColor: '#0339C5', // Couleur d'arrière-plan ajoutée
	},
	container: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 60,
		paddingHorizontal: 25,
	},
	arrowContainer: {
		width: 40,
		height: 40,
		position: 'absolute', // Position absolutely
		top: 60, // At the top of the container
		left: 10, // At the left of the container
		zIndex: 1,
	},
	arrow: {
		width: 28,
		height: 28,
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
		width: '100%',
		alignItems: 'center',
		padding: 10,
	},
	linkText: {
		color: '#fff',
		textDecorationLine: 'underline',
		padding: 20,
	},
	termsText: {
		color: '#fff',
		textAlign: 'center',
		marginTop: 15,
	},
});

export default RegisterPage;
