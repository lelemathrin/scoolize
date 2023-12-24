import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useFormContext } from '../../contexts/formContext';

const QuestionTwo = ({ navigation }) => {
	const { updateFormData } = useFormContext();

	const handleAnswer = (answer) => {
		updateFormData('question2', answer);
		navigation.navigate('QuestionThree');
	};

	return (
		<>
			<TouchableOpacity
				activeOpacity={1}
				style={styles.arrowContainer}
				onPress={() => navigation.goBack()} // Go to the previous page in the stack when pressed
			>
				<Image
					source={require('../../../assets/arrow.png')} // Remplacez par le chemin de votre logo
					style={styles.arrow}
				/>
			</TouchableOpacity>
			<View style={styles.container}>
				<Text style={styles.title}>
					As-tu besoin de flexibilité dans les horaires de cours (par exemple,
					cours du soir, options en ligne)
				</Text>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => handleAnswer('oui')}>
						<Text style={styles.buttonText}>Oui</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={() => handleAnswer('non')}>
						<Text style={styles.buttonText}>Non</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
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
	container: {
		flex: 1,
		backgroundColor: '#4B9CD3', // Matching the background color from code 1
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	title: {
		fontSize: 24,
		color: 'white',
		textAlign: 'center',
		marginBottom: 10, // Matching the title style from code 1
	},
	description: {
		fontSize: 18,
		color: 'white',
		textAlign: 'center',
		marginBottom: 30, // Matching the description style from code 1
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		marginTop: 70, // Adjusted to match the button container style from code 1
	},
	button: {
		backgroundColor: 'white',
		paddingVertical: 15,
		paddingHorizontal: 40,
		borderRadius: 20,
		marginHorizontal: 10, // Matching the button style from code 1
	},
	buttonText: {
		color: '#4B9CD3', // Matching the button text color from code 1
		fontSize: 18,
		textAlign: 'center',
	},
});

export default QuestionTwo;
