import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Nav from '../components/navbar';

const Accueil = ({ navigation }) => {
  const [utilisateur, setUtilisateur] = useState(null);
  const [recherche, setRecherche] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (utilisateur) => {
      if (utilisateur) {
        // L'utilisateur est connecté
        setUtilisateur(utilisateur);
      } else {
        // L'utilisateur est déconnecté
        setUtilisateur(null);
        navigation.navigate('Connexion');
      }
    });

    // Nettoyage de l'abonnement lors du démontage
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.conteneur}>
      <View style={styles.boiteFavoris}>
        <Text style={styles.texteFavoris}>Mes favoris</Text>
      </View>
      <View style={styles.conteneurRecherche}>
        <TextInput
          style={styles.champRecherche}
          placeholder="Rechercher..."
          onChangeText={(texte) => setRecherche(texte)}
          value={recherche}
        />
      </View>
      <View style={styles.conteneurBoites}>
        <View style={styles.boiteInterieure1}></View>
        <View style={styles.boiteInterieure2}></View>
        <View style={styles.boiteInterieure3}></View>
      </View>
      <View style={styles.boiteCandidatures}>
        <Text style={styles.texteCandidatures}>Mes candidatures</Text>
      </View>
      {/* Nouvelle boîte grise indépendante */}
      <View style={styles.nouvelleBoiteGrise}>
        {/* Contenu de la nouvelle boîte grise */}
      </View>
      <Nav navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  conteneur: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 40, // Espace en haut
  },
  boiteFavoris: {
    position: 'absolute',
    top: 60,
    left: 40, // Décalage vers la droite
    width: 118,
    height: 24,
    backgroundColor: '#135BA7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texteFavoris: {
    color: '#fff',
  },
 conteneurRecherche: {
  position: 'absolute',
  top: 100, // Aligné avec la boîte en haut à gauche
  right: 10, // Aligné avec le côté droit
  width: 180,
  borderWidth: 1,
  borderColor: '#000',
  borderRadius: 20,
  overflow: 'hidden',
},
champRecherche: {
  flex: 1,
  padding: 5,
  paddingLeft: 10,
  paddingRight: 10,
  placeholderTextColor: '#D9D9D9', // Couleur du texte en gris
},
  conteneurBoites: {
    position: 'absolute',
    left: 9,
    top: 100, // Légèrement en dessous de la boîte "Mes favoris"
    width: 180,
    height: 431,
    borderColor: '#000',
    justifyContent: 'space-between',
    borderRadius: 10,
    overflow: 'hidden',
  },
  boiteInterieure1: {
    width: '100%',
    height: 143,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
  },
  boiteInterieure2: {
    width: '100%',
    height: 143,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
    top: -13,
  },
  espaceVide: {
    width: '100%',
    height: 100, // Hauteur égale à la boîte 3
  },
  boiteInterieure3: {
    width: '100%',
    height: 100, // Hauteur réduite à 100 (peut être ajustée)
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    overflow: 'hidden',
    top: -23,
  },
  boiteCandidatures: {
    position: 'absolute',
    top: 530, // Position verticale ajustée
    left: 20,  // Position horizontale ajustée
    width: 160, // Largeur (peut être ajustée)
    height: 24, // Hauteur (peut être ajustée)
    backgroundColor: '#135BA7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texteCandidatures: {
    color: '#fff',
  },
  // Styles pour la nouvelle boîte grise
  nouvelleBoiteGrise: {
    position: 'absolute',
    top: 570, // Ajustez la position verticale selon vos besoins
    left: 13,  // Ajustez la position horizontale selon vos besoins
    width: 180, // Ajustez la largeur selon vos besoins
    height: 170, // Ajustez la hauteur selon vos besoins
    backgroundColor: '#D9D9D9', // Couleur de fond grise
    borderRadius: 10,
    // Autres styles pour le contenu de la nouvelle boîte grise
  },
});

export default Accueil;
