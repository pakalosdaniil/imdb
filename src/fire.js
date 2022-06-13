import fire from "firebase/compat/app";
import "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyGxwcOHMtE9K1pvLweRn83mVLVekFeJA",
  authDomain: "imdb-makers.firebaseapp.com",
  projectId: "imdb-makers",
  storageBucket: "imdb-makers.appspot.com",
  messagingSenderId: "278766168547",
  appId: "1:278766168547:web:1c3a338142ebfa7884d8d6",
};

export default fire.initializeApp(firebaseConfig);
