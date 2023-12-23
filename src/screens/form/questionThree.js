import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFormContext } from '../../contexts/formContext';

const QuestionThree = ({ navigation }) => {
    const { updateFormData } = useFormContext();

    const handleAnswer = (answer) => {
        updateFormData('question3', answer);
        navigation.navigate('QuestionFour');
    };

    return (
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
    );
};

const styles = StyleSheet.create({
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

export default QuestionThree;