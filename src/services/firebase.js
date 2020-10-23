import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

const firebaseInitialize = {
  apiKey: "AIzaSyD-2AFd4NMDQRsF35fX0crN2jhvu7hp1kY",
  authDomain: "indonesia-jelajah.firebaseapp.com",
  databaseURL: "https://indonesia-jelajah.firebaseio.com",
  projectId: "indonesia-jelajah",
  storageBucket: "indonesia-jelajah.appspot.com",
  messagingSenderId: "498606814752",
  appId: "1:498606814752:web:3050865845d9154b0fee45"
};

firebase.initializeApp(firebaseInitialize);

export {
  auth,
  database,
  storage
}