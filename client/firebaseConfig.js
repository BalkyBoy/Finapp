// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCQjd-J-ZlDU6E9z_KPFFhZdb4w3pv7Y0o",
  authDomain: "owopor-abcbf.firebaseapp.com",
  projectId: "owopor-abcbf",
  storageBucket: "owopor-abcbf.firebasestorage.app",
  messagingSenderId: "94539031347",
  appId: "1:94539031347:web:5f7741a2d53fec5f7e5446",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})


export { auth };
