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
	Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useUserContext } from '../contexts/userContext';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ButtonLarge from '../components/buttonLarge';

const AdditionalInfoScreen = ({ navigation }) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	const { userId } = useUserContext();
	const [age, setAge] = useState('');
	const [currentClass, setCurrentClass] = useState('');
	const [specialty, setSpecialty] = useState('');
	const [school, setSchool] = useState('');
	const [profilePicture, setProfilePicture] = useState(null);
	const [keyboardOffset, setKeyboardOffset] = useState(0);

	console.log(userId);

	const selectProfilePicture = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== 'granted') {
		  alert('Sorry, we need camera roll permissions to make this work!');
		  return;
		}
	  
		let result = await ImagePicker.launchImageLibraryAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.All,
		  allowsEditing: true,
		  aspect: [4, 3],
		  quality: 1,
		});
	  
		if (!result.canceled) {
		  setProfilePicture(result.assets[0].uri);
		}
	  };
	
	const handleSubmit = async () => {
	  if (!userId) {
		console.error('User ID is not available');
		return;
	  }
	
	  if (
		!age ||
		!currentClass ||
		!specialty ||
		!school
	  ) {
		Alert.alert('Veuillez remplir tout les champs');
		return;
	  }
	
	  const db = getFirestore();
	  const storage = getStorage();
	
	  try {
		const dataToSubmit = {
		  age,
		  currentClass,
		  specialty,
		  school,
		};
	
		if (profilePicture) {
			const response = await fetch(profilePicture);
			const blob = await response.blob();
			const imageRef = ref(storage, `profilePictures/${userId}`);
			const uploadTask = uploadBytesResumable(imageRef, blob);
		  
			// Wait for the upload to complete
			await new Promise((resolve, reject) => {
			  uploadTask.on('state_changed', 
				snapshot => {}, 
				error => reject(error), 
				() => resolve()
			  );
			});
		  
			const profilePictureUrl = await getDownloadURL(imageRef);
			dataToSubmit.profilePicture = profilePictureUrl;
		  }
		
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
					<KeyboardAwareScrollView
						extraScrollHeight={20}>
						<View style={styles.container}>
								<View style={styles.photo}>
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
									<Text style={styles.photoFont}>Éditer</Text>
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
							<ButtonLarge
								style={[styles.absoluteButton]}
								title='Soumettre'
								onPress={handleSubmit}
								buttonColor='white'
								textColor='black'
							/>
						</View>
					</KeyboardAwareScrollView>
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
	photoFont: {
		fontFamily: 'Inter-Regular',
		color: 'white',
		fontSize: 12,
		marginTop: 10,
	},
	absoluteButton: {
		position: 'absolute',
		bottom: 30,
	},
	photo: {
		alignItems: 'center',
		marginTop: 50,
		marginBottom: 20,
	},
});

export default AdditionalInfoScreen;
