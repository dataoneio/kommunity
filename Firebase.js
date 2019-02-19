import firebase from "@firebase/app";
import "@firebase/storage";
import "@firebase/auth";
import "@firebase/database";

var config = {
  apiKey: "AIzaSyAbAQuVD0dj3a8QCjCUymxeFqyXx1kvpJg",
  authDomain: "practice-82dce.firebaseapp.com",
  databaseURL: "https://practice-82dce.firebaseio.com",
  projectId: "practice-82dce",
  storageBucket: "practice-82dce.appspot.com",
  messagingSenderId: "997763906167"
};
firebase.initializeApp(config);
export default firebase;
