import React, { useState, useEffect, useRef } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Button,
} from 'react-native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import ModalStyled from '../components/modalStyled'; // Import the new modal component
import Nav from '../components/navbar';
import { ScrollView } from 'react-native-gesture-handler';

const Profile = ({ navigation }) => {
	const [user, setUser] = useState(null);
	const [profileData, setProfileData] = useState({
		firstName: '',
		lastName: '',
		age: '',
		currentClass: '',
		specialty: '',
		school: '',
	});
	const auth = getAuth();
	const firestore = getFirestore();
	const modalControl = useRef({});

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
			if (authUser) {
				// User is signed in
				setUser(authUser);

				// Load the user's profile data from Firestore
				const userDoc = doc(firestore, 'users', authUser.uid);
				const userDocSnapshot = await getDoc(userDoc);
				if (userDocSnapshot.exists()) {
					setProfileData(userDocSnapshot.data());
				}
			} else {
				// User is signed out
				navigation.replace('Login');
			}
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);

	const handleUpdateProfile = async () => {
		if (!user) {
			console.error('No user logged in');
			return;
		}

		try {
			const userDocRef = doc(firestore, 'users', user.uid);
			await updateDoc(userDocRef, profileData);
			console.log('Profile updated successfully');

			modalControl.current.close();
		} catch (error) {
			console.error('Error updating profile:', error);
		}
	};

	const handleChange = (name, value) => {
		setProfileData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSignOut = async () => {
		try {
			await signOut(auth);
			// After sign out, the onAuthStateChanged listener will handle the redirection
		} catch (error) {
			console.error('Error signing out: ', error);
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<Text>Profile</Text>
				{user ? (
					<>
						<Text>Welcome, {user.email}</Text>
						<Button
							title='Edit Profile'
							onPress={() => modalControl.current.open()}
						/>
						<Button
							title='Log out'
							onPress={handleSignOut}
						/>
					</>
				) : (
					<Text>Not logged in</Text>
				)}
			</ScrollView>
			<Nav navigation={navigation} />

			<ModalStyled
				externalControl={modalControl.current}
				title='Edit Your Profile'>
				<View style={styles.modalContent}>
					<TextInput
						style={styles.input}
						value={profileData.firstName}
						onChangeText={(value) => handleChange('firstName', value)}
						placeholder='First Name'
					/>
					<TextInput
						style={styles.input}
						value={profileData.lastName}
						onChangeText={(value) => handleChange('lastName', value)}
						placeholder='Last Name'
					/>
					{/* Add other input fields as needed */}
					<Button
						title='Save Changes'
						onPress={handleUpdateProfile}
					/>
				</View>
			</ModalStyled>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		backgroundColor: '#F2F2F2',
		padding: 15,
		marginBottom: 10,
		borderRadius: 5,
	},
	modalContent: {
    
  },
});

export default Profile;
