import React from 'react';
import { View, Text, Button } from 'react-native';
import { useFormContext } from '../../contexts/formContext'; // Correct import here

const QuestionOne = ({ navigation }) => {
    const { updateFormData } = useFormContext(); // Use the hook to access context

    const handleAnswer = (answer) => {
        updateFormData('question1', answer); // Update the context with the answer
        navigation.navigate('QuestionTwo'); // Navigate to the next question
    };

    return (
        <View>
            <Text>As-tu déjà identifié un domaine d'étude qui t'intéresse ?</Text>
            <Button title="Oui" onPress={() => handleAnswer('Oui')} />
            <Button title="Plus tard" onPress={() => handleAnswer('Plus tard')} />
        </View>
    );
};

export default QuestionOne;
