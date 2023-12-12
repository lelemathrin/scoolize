import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const UserProfileForm = ({ navigation }) => {
    const [formData, setFormData] = useState({
        // Initialize your form fields, e.g., age, preferences, etc.
        age: '',
        preference: '',
        // other fields as needed
    });

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        const auth = getAuth();
        const db = getFirestore();
        const userDoc = doc(db, 'users', auth.currentUser.uid);

        try {
            await setDoc(userDoc, formData);
            // Navigate to next screen or show success message
        } catch (error) {
            console.error('Error saving user profile:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Complete Your Profile</Text>
            
            {/* Add TextInput for each form field */}
            <TextInput
                style={styles.input}
                placeholder="Age"
                value={formData.age}
                onChangeText={(text) => handleInputChange('age', text)}
            />
            {/* Add more fields as needed */}
            
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    // Add more styling as needed
});

export default UserProfileForm;
