// AdditionalInfoScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator, TextInput, Alert } from 'react-native';
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

	console.log(userId);

	const handleSubmit = async () => {
		if (!userId) {
		  console.error('User ID is not available');
		  return;
		}
	  
		if (!firstName || !lastName || !age || !currentClass || !specialty || !school) {
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
		  console.log("Data sent successfully");
	  
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
					<ScrollView style={styles.container}>
						<View style={styles.inputContainer}>
							<Text style={styles.font}>Prénom</Text>
							<TextInput
								style={styles.input}
								placeholder='Alexis'
								onChangeText={setFirstName}
							/>
						</View>
						<View style={styles.inputContainer}>
							<Text style={styles.font}>Nom</Text>
							<TextInput
								style={styles.input}
								placeholder='Dupont'
								onChangeText={setLastName}
							/>
						</View>
						<View style={styles.inputContainer}>
							<Text style={styles.font}>Âge</Text>
							<TextInput
								style={styles.input}
								placeholder='Entrer votre âge'
								onChangeText={setAge}
							/>
						</View>
						<View style={styles.inputContainer}>
							<Text style={styles.font}>Classe actuelle</Text>
							<TextInput
								style={styles.input}
								placeholder='Entrer votre classe'
								onChangeText={setCurrentClass}
							/>
						</View>
						<View style={styles.inputContainer}>
							<Text style={styles.font}>Spécialité(s)</Text>
							<TextInput
								style={styles.input}
								placeholder='Entrer votre/vos spécialité(s)'
								onChangeText={setSpecialty}
							/>
						</View>
						<View style={styles.inputContainer}>
							<Text style={styles.font}>École actuelle</Text>
							<TextInput
								style={styles.input}
								placeholder='Entrer votre école actuelle'
								onChangeText={setSchool}
							/>
						</View>
					</ScrollView>
					<View style={styles.styledButton}>
						<ButtonLarge
							title='Soumettre'
							onPress={handleSubmit}
							buttonColor='white'
							textColor='black'
						/>
					</View>
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
		paddingTop: 150,
		paddingHorizontal: 35,
		width: '100%',
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
	styledButton: {
		position: 'absolute',
		bottom: 50,
	},
});

export default AdditionalInfoScreen;
