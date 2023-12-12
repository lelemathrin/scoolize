import React from 'react';
import { View, Text, Button } from 'react-native';
import { useFormContext } from '../../contexts/formContext'; // Correct import here

const QuestionThree = ({ navigation }) => {
    const { updateFormData } = useFormContext();

    const handleAnswer = (answer) => {
        updateFormData('question3', answer); // Update the context with the answer
        navigation.navigate('QuestionFour'); // Navigate to the next question
    };

    return (
        <View>
            <Text>La distance représente un obstacle pour toi dans le choix de ton parcours éducatif ?</Text>
            <Button title="Oui" onPress={() => handleAnswer('Oui')} />
            <Button title="Non" onPress={() => handleAnswer('Non')} />
        </View>
    );
};

export default QuestionThree;
