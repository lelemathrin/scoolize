import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFormContext } from '../../contexts/formContext';
import { useUserContext } from '../../contexts/userContext'; // Import useUserContext
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { auth } from '../../services/firebaseConfig'; // Import auth

const FinishScreen = ({ navigation }) => {
    const { formData } = useFormContext();
    const { userId } = useUserContext();
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUserEmail(user.email); // Set the user's email
        }
    }, []);

    const handleSubmitAndGoHome = async () => {
        if (!userId) {
            console.error("User ID is not available");
            return;
        }

        const db = getFirestore();

        try {
            const dataToSubmit = {
                email: userEmail, // Include email in the document
                ...formData
            };
            await setDoc(doc(db, "userForms", userId), dataToSubmit);

            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        } catch (error) {
            console.error("Error writing document: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.congratsText}>{'Félicitations ! Maintenant qu’on en sait plus sur toi, tu peux commencer à faire tes vœux. Nous serons là pour t’accompagner.'}</Text>
            <TouchableOpacity onPress={handleSubmitAndGoHome} style={styles.homeButton}>
                <Text>Continuer</Text>
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
