import firebase from "@firebase/app";
import "@firebase/storage";
import "@firebase/auth";
import "@firebase/database";

var config = {
    apiKey: "AIzaSyDTjGuYDXRRf9MMDl5JvYQ72YJzVGxQwgE",
    authDomain: "community-social-network.firebaseapp.com",
    databaseURL: "https://community-social-network.firebaseio.com",
    projectId: "community-social-network",
    storageBucket: "community-social-network.appspot.com",
    messagingSenderId: "282478331018"
}
firebase.initializeApp(config);
export default firebase;

