import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAVG8JhI8cpT7mzFAPkXmOF5hSyTXgWdZk",
  authDomain: "panda-chat-masfik.firebaseapp.com",
  projectId: "panda-chat-masfik",
  storageBucket: "panda-chat-masfik.appspot.com",
  messagingSenderId: "962084933470",
  appId: "1:962084933470:web:97c0d7a089fb9c9fac49cf",
};

const app = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
