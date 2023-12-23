import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FormStartScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Voulez-vous participer au questionnaire de personnalité ?</Text>
            <Text style={styles.description}>
                Il te permettra de trier tes envies et de recevoir des recommandations.
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={() => navigation.reset({ 
                        index: 0, 
                        routes: [{ name: 'QuestionOne'}],
                    })}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Oui</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Main' }] })} 
                    style={styles.button}>
                    <Text style={styles.buttonText}>Plus tard</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4B9CD3', // Assuming this is the background color from the screenshot
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 18,
        color: 'white',
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
        paddingHorizontal: 40,
        borderRadius: 20,
        marginHorizontal: 10,
        marginTop: 70,
    },
    buttonText: {
        color: '#4B9CD3', // Assuming this is the text color from the screenshot
        fontSize: 18,
        textAlign: 'center',
    },
});

export default FormStartScreen;
