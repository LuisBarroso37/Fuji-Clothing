import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDKGxSEF-cA9mjhdzTOj6VUMVSZy_9TEKw',
  authDomain: 'fuji-db.firebaseapp.com',
  databaseURL: 'https://fuji-db.firebaseio.com',
  projectId: 'fuji-db',
  storageBucket: 'fuji-db.appspot.com',
  messagingSenderId: '1064122746845',
  appId: '1:1064122746845:web:da61758f48ec89fbf6d834',
  measurementId: 'G-54QPRDD1R3',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export default firebase;
