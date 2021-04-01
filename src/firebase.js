import firebase from 'firebase';

//This is my Firebase config info
const firebaseConfig = {
  apiKey: "AIzaSyDh64cQk1-DYRXPD0izzQvbWObPQ2ulICI",
  authDomain: "my-app-409dc.firebaseapp.com",
  projectId: "my-app-409dc",
  storageBucket: "my-app-409dc.appspot.com",
  databaseURL:"https://my-app-409dc-default-rtdb.firebaseio.com/",
  messagingSenderId: "486350825684",
  appId: "1:486350825684:web:7f386a0891b73f2c337341",
  measurementId: "G-BDZ5VGHS25"
  };

// Initilize firebase App, with database, Gooogle authentication
const firebaseApp = firebase.initializeApp(firebaseConfig);  
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default {db};