import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/analytics"


// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field

  const firebaseConfig = {
  // apiKey: "AIzaSyDFiq8p_PECVxpnlDP-IG6txCCjRg-hx9Q",
  // authDomain: "starfollowup-cfa64.firebaseapp.com",
  // databaseURL: "https://starfollowup-cfa64-default-rtdb.firebaseio.com",
  // projectId: "starfollowup-cfa64",
  // storageBucket: "starfollowup-cfa64.appspot.com",
  // messagingSenderId: "263964889362",
  // appId: "1:263964889362:web:b0ee9476c31885f5a563cb",
  // measurementId: "G-N41WVG4VVL"
  apiKey: "AIzaSyCwB63I1xIoTJIlyz1VKkqUwQiMI-xC43k",
  authDomain: "ima-india-dev.firebaseapp.com",
  projectId: "ima-india-dev",
  // storageBucket: "ima-india-dev.appspot.com",
  // messagingSenderId: "1097438200753",
  appId: "1:1097438200753:web:ae7d84e71819fb0ed63390"
}

 const app = firebase.initializeApp(firebaseConfig)
 export default app