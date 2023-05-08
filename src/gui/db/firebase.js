import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


export const firestore = firebase.initializeApp({
  apiKey: "AIzaSyD9wMwhbUTXZLA-T5i9EyX3qcxDwRVBIY4",
  authDomain: "alpha-the-art-of-drift-8543a.firebaseapp.com",
  projectId: "alpha-the-art-of-drift-8543a",
  storageBucket: "alpha-the-art-of-drift-8543a.appspot.com",
  messagingSenderId: "430197809384",
  appId: "1:430197809384:web:c33bc7c9dae5b6ebbea95d",
  measurementId: "G-BV2CTJYHN2"
}).firestore();
