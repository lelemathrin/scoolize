import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useFormContext } from '../../contexts/formContext';

const QuestionThree = ({ navigation }) => {
    const { updateFormData } = useFormContext();
    const [selectedOptions, setSelectedOptions] = useState([]); // For multiple selections

    // Define the options array
    const options = ['Scientifique', 'Littéraire', 'Informatique', 'Communication', 'Sport', 'Psychologie'];

    const handleToggleOption = (option) => {
        if (selectedOptions.includes(option)) {
            // If the option is already selected, remove it from the array
            setSelectedOptions(selectedOptions.filter(selected => selected !== option));
        } else {
            // If the option is not selected, add it to the array
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    const isSelected = (option) => selectedOptions.includes(option);

    const handleNext = () => {
        if (selectedOptions.length === 0) {
            Alert.alert("Sélection requise", "Veuillez sélectionner au moins une option.");
            return;
        }

        updateFormData('question3', selectedOptions);
        navigation.navigate('QuestionFour'); // Navigate to the next question
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
            <Text style={styles.question}>Quelles sont les branches susceptibles de t'intéresser ?</Text>
            {options.map(option => (
                <TouchableOpacity
                    key={option}
                    style={[styles.option, isSelected(option) ? styles.selectedOption : {}]}
                    onPress={() => handleToggleOption(option)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.optionText}>{option}</Text>
                    <View style={isSelected(option) ? styles.selectedCircle : styles.circle} />
                </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                <Text style={styles.nextButtonText}>Continuer</Text>
            </TouchableOpacity>
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
        backgroundColor: '#4B9CD3', 
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    question: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 30,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)', 
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 10,
        width: '100%',
    },
    selectedOption: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    },
    optionText: {
        flex: 1,
        color: 'white',
        fontSize: 18,
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'white',
        marginRight: 10,
    },
    selectedCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'white',
        marginRight: 10,
    },
    nextButton: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginTop: 20,
        width: '100%', 
        alignItems: 'center', 
    },
    nextButtonText: {
        color: '#4B9CD3', 
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default QuestionThree;
