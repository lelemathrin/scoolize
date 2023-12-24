import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useFormContext } from '../../contexts/formContext';

const QuestionSix = ({ navigation }) => {
    const { updateFormData } = useFormContext();
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleNext = () => {
        if (!selectedOption) {
            Alert.alert("Selection Required", "Please select an option.");
            return;
        }

        updateFormData('question6', selectedOption);
        navigation.navigate('QuestionFinish');
    };

    const options = [
        'Moins de 5 km',
        '10-20 km',
        '20-35 km',
        '35-50 km',
        '50-100 km',
        'Plus de 100 km'
    ];

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
            <Text style={styles.questionText}>
                Quelle est la distance maximale, en kilomètres, que tu serais prêt à parcourir pour tes études ?
            </Text>
            <View style={styles.optionsContainer}>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.option,
                            selectedOption === option && styles.selectedOption
                        ]}
                        onPress={() => handleOptionSelect(option)}
                    >
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>
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
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#4B9CD3', // Blue background color
    },
    questionText: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 30
    },
    optionsContainer: {
        alignSelf: 'stretch',
        marginHorizontal: 20,
        marginBottom: 30
    },
    option: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 25,
        paddingVertical: 15,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectedOption: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    optionText: {
        color: 'white',
        fontSize: 18
    },
    nextButton: {
        backgroundColor: 'white',
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 30,
        width: '100%', // Full width button
        alignItems: 'center' // Center text horizontally
    },
    nextButtonText: {
        color: '#4B9CD3', // Blue text color
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default QuestionSix;