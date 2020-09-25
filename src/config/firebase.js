import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5mx4wds5s-aTiR-4_F_mNwiWu91MwFe0",
  authDomain: "instagram-clone-1911e.firebaseapp.com",
  databaseURL: "https://instagram-clone-1911e.firebaseio.com",
  projectId: "instagram-clone-1911e",
  storageBucket: "instagram-clone-1911e.appspot.com",
  messagingSenderId: "266683119061",
  appId: "1:266683119061:web:aaf22e6e68ad25e878b95c",
  measurementId: "G-CL03LTF13K",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebaseApp.firestore();
const storage = firebase.storage();

export { auth, db, storage };
