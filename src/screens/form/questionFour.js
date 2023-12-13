import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFormContext } from '../../contexts/formContext';

const QuestionFour = ({ navigation }) => {
    const { updateFormData } = useFormContext();
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionSelect = (option) => {
        setSelectedOption(option); // Directly set the new option
    };

    const handleNext = () => {
        if (!selectedOption) {
            Alert.alert("Selection Required", "Please select an option.");
            return;
        }

        updateFormData('question4', selectedOption);
        navigation.navigate('QuestionFinish'); // Navigate to the next question
    };

    const options = ['Moins de 5 km', '10 à 20 km', '20 à 35 km', '35 à 50 km', '50 à 100 km', 'Plus de 100 km'];

    return (
        <View style={styles.container}>
            <Text>Quelle est la distance maximale, en kilomètres, que tu serais prêt à parcourir pour tes études ?</Text>
            {options.map(option => (
                <TouchableOpacity
                    key={option}
                    style={[styles.option, selectedOption === option ? styles.selected : null]}
                    onPress={() => handleOptionSelect(option)}
                >
                    <Text>{option}</Text>
                </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
                <Text>Next</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    option: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10,
    },
    selected: {
        backgroundColor: '#cde',
    },
    nextButton: {
        backgroundColor: '#ade',
        padding: 10,
        borderRadius: 5,
    }
});

export default QuestionFour;
