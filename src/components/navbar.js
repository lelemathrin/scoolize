import * as React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import HomeIcon from '../../assets/home.png';
import VoeuxIcon from '../../assets/voeux.png';
import ChatbotIcon from '../../assets/chatbot.png';
import ProfileIcon from '../../assets/profile.png';

const Nav = ({ navigation }) => {
	const route = useRoute();

	return (
		<View style={styles.nav}>
			<Pressable
				style={[styles.boutons, route.name === 'Home' && styles.active]}
				onPress={() => navigation.navigate('Home')}>
			<Image source={HomeIcon} style={{ width: 28, height: 28, tintColor: route.name === 'Home' ? 'white' : 'black' }} />					
			<Text style={[styles.texte, route.name === 'Home' ? { color: 'white' } : { color: 'black' }]}>Accueil</Text>
			</Pressable>
			<Pressable
				style={[styles.boutons, route.name === 'Voeux' && styles.active]}
				onPress={() => navigation.navigate('Voeux')}>
				<Image source={VoeuxIcon} style={{ width: 28, height: 28, tintColor: route.name === 'Voeux' ? 'white' : 'black' }} />
				<Text style={[styles.texte, route.name === 'Voeux' ? { color: 'white' } : { color: 'black' }]}>Voeux</Text>
			</Pressable>
			<Pressable
				style={[styles.boutons, route.name === 'Chatbot' && styles.active]}
				onPress={() => navigation.navigate('Chatbot')}>
				<Image source={ChatbotIcon} style={{ width: 28, height: 28, tintColor: route.name === 'Chatbot' ? 'white' : 'black' }} />
				<Text style={[styles.texte, route.name === 'Chatbot' ? { color: 'white' } : { color: 'black' }]}>Chatbot</Text>
			</Pressable>
			<Pressable
				style={[styles.boutons, route.name === 'Profile' && styles.active]}
				onPress={() => navigation.navigate('Profile')}>
				<Image source={ProfileIcon} style={{ width: 28, height: 28, tintColor: route.name === 'Profile' ? 'white' : 'black' }} />
				<Text style={[styles.texte, route.name === 'Profile' ? { color: 'white' } : { color: 'black' }]}>Profil</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	texte: {
		textAlign: 'center',
		fontFamily: 'Inter-Medium',
		fontWeight: '500',
		fontSize: 12,
		marginTop: 5,
	},
	boutons: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 70,
		height: 70,
		padding: 10,
	},
	nav: {
		backgroundColor: '#fff',
		shadowColor: 'rgba(0, 0, 0, 0.1)',
		shadowRadius: 20,
		elevation: 20,
		shadowOpacity: 1,
		width: '100%',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		height: 110,
		justifyContent: 'space-evenly',
		position: 'absolute',
		bottom: 0,
		paddingTop: 10,
	},
	active : {
		backgroundColor: '#135BA7',
		borderRadius: 15,
	}
});

export default Nav;
