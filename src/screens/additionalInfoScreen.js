// AdditionalInfoScreen.js
import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Keyboard,
	View,
	ImageBackground,
	TextInput,
	Text,
	ActivityIndicator,
	KeyboardAvoidingView,
	TouchableOpacity,
	Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { useUserContext } from '../contexts/userContext';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import ButtonLarge from '../components/buttonLarge';

const AdditionalInfoScreen = ({ navigation }) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	const { userId } = useUserContext();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [age, setAge] = useState('');
	const [currentClass, setCurrentClass] = useState('');
	const [specialty, setSpecialty] = useState('');
	const [school, setSchool] = useState('');
	const [profilePicture, setProfilePicture] = useState(null);

	console.log(userId);

	const selectProfilePicture = () => {
		ImagePicker.showImagePicker({}, (response) => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else {
				setProfilePicture(response.uri);
			}
		});
	};

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			(event) => setKeyboardOffset(event.endCoordinates.height)
		);

		const keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			() => setKeyboardOffset(0)
		);

		return () => {
			keyboardDidShowListener.remove();
			keyboardDidHideListener.remove();
		};
	}, []);

	const handleSubmit = async () => {
		if (!userId) {
			console.error('User ID is not available');
			return;
		}

		if (
			!firstName ||
			!lastName ||
			!age ||
			!currentClass ||
			!specialty ||
			!school
		) {
			Alert.alert('Veuillez remplir tout les champs');
			return;
		}

		const db = getFirestore();

		try {
			const dataToSubmit = {
				firstName,
				lastName,
				age,
				currentClass,
				specialty,
				school,
			};
			await setDoc(doc(db, 'users', userId), dataToSubmit, { merge: true });
			console.log('Data sent successfully');

			navigation.reset({
				index: 0,
				routes: [{ name: 'Form' }],
			});
		} catch (error) {
			console.error('Error writing document: ', error);
		}
	};

	return (
		<ImageBackground
			source={require('../../assets/overlay.png')}
			style={styles.backgroundImage}
			onLoadEnd={() => setImageLoaded(true)}>
			{imageLoaded ? (
				<>
					<KeyboardAvoidingView
						behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
						<View style={styles.container}>
							<ScrollView>
								<TouchableOpacity onPress={selectProfilePicture}>
									<Image
										source={
											profilePicture
												? { uri: profilePicture }
												: require('../../assets/default-profile-picture.png')
										}
										style={{ width: 100, height: 100, borderRadius: 50 }}
									/>
								</TouchableOpacity>
								<View style={styles.inputContainer}>
									<Text style={styles.font}>Prénom</Text>
									<TextInput
										style={styles.input}
										placeholder='Alexis'
										placeholderTextColor='grey'
										onChangeText={setFirstName}
									/>
								</View>
								<View style={styles.inputContainer}>
									<Text style={styles.font}>Nom</Text>
									<TextInput
										style={styles.input}
										placeholder='Dupont'
										placeholderTextColor='grey'
										onChangeText={setLastName}
									/>
								</View>
								<View style={styles.inputContainer}>
									<Text style={styles.font}>Âge</Text>
									<TextInput
										style={styles.input}
										placeholder='Entrer votre âge'
										placeholderTextColor='grey'
										onChangeText={setAge}
									/>
								</View>
								<View style={styles.inputContainer}>
									<Text style={styles.font}>Classe actuelle</Text>
									<TextInput
										style={styles.input}
										placeholder='Entrer votre classe'
										placeholderTextColor='grey'
										onChangeText={setCurrentClass}
									/>
								</View>
								<View style={styles.inputContainer}>
									<Text style={styles.font}>Spécialité(s)</Text>
									<TextInput
										style={styles.input}
										placeholder='Entrer votre/vos spécialité(s)'
										placeholderTextColor='grey'
										onChangeText={setSpecialty}
									/>
								</View>
								<View style={styles.inputContainer}>
									<Text style={styles.font}>École actuelle</Text>
									<TextInput
										style={styles.input}
										placeholder='Entrer votre école actuelle'
										placeholderTextColor='grey'
										onChangeText={setSchool}
									/>
								</View>
								<View style={{ height: 20 }} />
							</ScrollView>
							<ButtonLarge
								style={[styles.absoluteButton]}
								title='Soumettre'
								onPress={handleSubmit}
								buttonColor='white'
								textColor='black'
							/>
						</View>
					</KeyboardAvoidingView>
				</>
			) : (
				<ActivityIndicator
					size='large'
					color='#0339C5'
				/>
			)}
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	backgroundImage: {
		width: '100%',
		height: '100%',
		justifyContent: 'center', // Center the loading indicator
		alignItems: 'center',
	},
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingBottom: 30,
	},
	inputContainer: {
		marginBottom: 30,
	},
	input: {
		padding: 15,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#CDCDCD',
		color: 'white',
	},
	font: {
		fontFamily: 'Inter-Regular',
		color: 'white',
		fontSize: 12,
		marginBottom: 10,
	},
	absoluteButton: {
		position: 'absolute',
		bottom: 30,
	},
});

export default AdditionalInfoScreen;
