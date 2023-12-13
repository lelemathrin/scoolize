import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FormStartScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Would you like to start the form?</Text>
            <TouchableOpacity 
                onPress={() => navigation.reset({ 
                    index: 0, 
                    routes: [{ name: 'QuestionOne'}],
                })}
                style={styles.button}>
                <Text>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })} 
                style={styles.button}>
                <Text>No</Text>
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
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#ade',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
});

export default FormStartScreen;
