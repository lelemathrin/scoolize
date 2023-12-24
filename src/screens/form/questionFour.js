import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useFormContext } from '../../contexts/formContext';

const QuestionFour = ({ navigation }) => {
    const { updateFormData } = useFormContext();

    const handleAnswer = (answer) => {
        updateFormData('question4', answer);
        navigation.navigate('QuestionFive');
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
            <Text style={styles.questionText}>La distance représente un obstacle pour toi dans le choix de ton parcours éducatif ?</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={() => handleAnswer('oui')}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Oui</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => handleAnswer('non')}
                    style={styles.button}>
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
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#4B9CD3', 
    },
    questionText: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginHorizontal: 10, 
        marginTop: 70,
    },
    buttonText: {
        color: '#4B9CD3', 
        textAlign: 'center',
    },
});

export default QuestionFour;