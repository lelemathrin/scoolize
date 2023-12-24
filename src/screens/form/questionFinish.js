import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
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
                routes: [{ name: 'Main' }],
            });
        } catch (error) {
            console.error("Error writing document: ", error);
        }
    };

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
            <Text style={styles.congratsText}>
                Félicitation !{'\n'}Maintenant qu’on en sait plus sur toi, tu peux commencer à faire tes vœux.{'\n'}Nous serons là pour t’accompagner.
            </Text>
            <TouchableOpacity onPress={handleSubmitAndGoHome} style={styles.continueButton}>
                <Text style={styles.continueButtonText}>Continuer</Text>
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
        backgroundColor: '#4B9CD3', // Assuming this is the background color from the screenshot
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    congratsText: {
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    continueButton: {
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 30,
        marginBottom: 20, 
        marginTop: 70,
    },
    continueButtonText: {
        color: '#4B9CD3',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default FinishScreen;
