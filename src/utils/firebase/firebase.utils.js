import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from "firebase/auth";
import { 
  getFirestore,
  doc,
  getDoc,
  setDoc 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8CdFcgMnNR5qzRrDJBNf9eakgg4GheMk",
  authDomain: "e-commerce-project-7fb02.firebaseapp.com",
  projectId: "e-commerce-project-7fb02",
  storageBucket: "e-commerce-project-7fb02.firebasestorage.app",
  messagingSenderId: "279193052974",
  appId: "1:279193052974:web:fc0bd4305514bb3773bcbf"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;
}