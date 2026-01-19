import firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyDMq6l5ZPAxq4i88AW6_HNMMBVz3dGx2bI",
    authDomain: "messenger-notif.firebaseapp.com",
    projectId: "messenger-notif",
    storageBucket: "messenger-notif.firebasestorage.app",
    messagingSenderId: "1078575696463",
    appId: "1:1078575696463:web:6723f5e6436ca9ef06f83a"
};

firebase.initializeApp(firebaseConfig);

export const messaging = firebase.messaging();