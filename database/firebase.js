import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAnx7iN4sxyPuAXx6hhrfIfEEVezJ8cWUI",
    authDomain: "foodoor-480e3.firebaseapp.com",
    databaseURL: "https://foodoor-480e3.firebaseio.com",
    projectId: "foodoor-480e3",
    storageBucket: "foodoor-480e3.appspot.com",
    messagingSenderId: "701107853854",
    appId: "1:701107853854:web:f8f9cd77ef8c9af363ec0f",
    measurementId: "G-0RTN6C2W63"
};

firebase.initializeApp(firebaseConfig);

export default firebase;