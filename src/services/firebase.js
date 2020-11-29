import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

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

const fireAuth = firebase.auth();
const fireDatabase = firebase.database();
const fireStorage = firebase.storage();

const googleFireAuth = new firebase.auth.GoogleAuthProvider();

export {
  fireAuth,
  fireDatabase,
  fireStorage,
  googleFireAuth
}