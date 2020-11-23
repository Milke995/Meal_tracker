import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyAlOWyR9mxtgrPWXGIQ34TxitYvQbC6C6I',
  authDomain: 'meal-3eebb.firebaseapp.com',
  databaseURL: 'https://meal-3eebb.firebaseio.com',
  projectId: 'meal-3eebb',
  storageBucket: 'meal-3eebb.appspot.com',
  messagingSenderId: '624669728524',
  appId: '1:624669728524:web:bee4bdf74f69577891f329',
  measurementId: 'G-FZEQ9V1VLX',
};
const fst = firebase.initializeApp(config);
export const db = firebase.firestore();
export default fst;
