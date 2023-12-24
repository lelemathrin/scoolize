import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFormContext } from '../../contexts/formContext';

const QuestionOne = ({ navigation }) => {
    const { updateFormData } = useFormContext();

    const handleAnswer = (answer) => {
        updateFormData('question1', answer);
        navigation.navigate('QuestionTwo');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>As-tu déjà identifié un domaine d'étude qui t'intéresse ?</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => handleAnswer('oui')}
                >
                    <Text style={styles.buttonText}>Oui</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => handleAnswer('non')}
                >
                    <Text style={styles.buttonText}>Non</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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

export default QuestionOne;
