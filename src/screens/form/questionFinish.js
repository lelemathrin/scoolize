import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FinishScreen = ({ navigation }) => {
    const handleGoHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.congratsText}>Congratulations! You have completed the form.</Text>
            <TouchableOpacity onPress={handleGoHome} style={styles.homeButton}>
                <Text>Go to Home Screen</Text>
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
    congratsText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    homeButton: {
        backgroundColor: '#ade',
        padding: 10,
        borderRadius: 5,
    },
});

export default FinishScreen;
