import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFormContext } from '../../contexts/formContext';

const QuestionTwo = ({ navigation }) => {
    const { updateFormData } = useFormContext();
    const [selectedOptions, setSelectedOptions] = useState([]);

    // Define the options array
    const options = ['Scientifique', 'Littéraire', 'Informatique', 'Communication', 'Sport', 'Psychologie'];

    const handleToggleOption = (option) => {
        const newOptions = selectedOptions.includes(option)
            ? selectedOptions.filter(item => item !== option)
            : [...selectedOptions, option];
        setSelectedOptions(newOptions);
    };

    const isSelected = (option) => selectedOptions.includes(option);

    const handleNext = () => {
        if (selectedOptions.length === 0) {
            Alert.alert("Selection Required", "Please select at least one option.");
            return;
        }

        updateFormData('question2', selectedOptions);
        navigation.navigate('QuestionThree'); // Navigate to the next question
    };

    return (
        <View style={styles.container}>
            <Text>Quelles sont les branches susceptibles de t'intéresser ?</Text>
            {options.map(option => (
                <TouchableOpacity
                    key={option}
                    style={[styles.option, isSelected(option) ? styles.selected : null]}
                    onPress={() => handleToggleOption(option)}
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

export default QuestionTwo;
