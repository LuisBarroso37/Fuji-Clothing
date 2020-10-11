import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { ICollection } from '../redux/shop/shop.reducer';

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

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

interface IAdditionalData {
  [key: string]: string;
}

export const createUserProfileDocument = async (
  userAuth: firebase.User | null,
  additionalData?: IAdditionalData
) => {
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

export const addCollectionAndDocuments = async (
  collectionKey: string,
  objectsToAdd: Array<ICollection>
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();

  // Add all collections to one call to the firestore
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionSnapshotToMap = (
  collections: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((acc: IAccumulatorObject, collection) => {
    acc[collection.title.toLowerCase()] = collection;
    return acc;
  }, {});
};

export interface IAccumulatorObject {
  [key: string]: ICollection;
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export default firebase;
