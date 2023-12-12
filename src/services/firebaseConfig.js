import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCGjSaDsuGZlfw2KE_UcW66fAPpGLTsWxY",

  authDomain: "schoolize-native.firebaseapp.com",

  projectId: "schoolize-native",

  storageBucket: "schoolize-native.appspot.com",

  messagingSenderId: "626348913449",

  appId: "1:626348913449:web:f687fade67d2c0fb37bd38",

  measurementId: "G-LBLKE6VSJ7"

};  
  
  const app = initializeApp(firebaseConfig);
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  
  export { app, auth };