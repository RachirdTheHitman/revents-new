import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5j-S-knvHfOCc1aFbF93MqMBbIYyzaKw",
  authDomain: "revents-57a1f.firebaseapp.com",
  databaseURL: "https://revents-57a1f.firebaseio.com",
  projectId: "revents-57a1f",
  storageBucket: "",
  messagingSenderId: "108764340389"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
};
firestore.settings(settings);

export default firebase;
