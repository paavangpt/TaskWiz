import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";

import {
    getFirestore,
    getDocs,
    collection,
    where,
    addDoc,
    query,
    updateDoc,
    getDoc,
    doc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA89bodDFAtNFwpXkbequIVNinKVICLCoM",
    authDomain: "taskwiz-14aaa.firebaseapp.com",
    projectId: "taskwiz-14aaa",
    storageBucket: "taskwiz-14aaa.appspot.com",
    messagingSenderId: "427699344439",
    appId: "1:427699344439:web:5797b8629240a9c6835bb2",
    measurementId: "G-K1D90RBBZ3",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const authProvider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
    return signInWithPopup(auth, authProvider);
}

export const loadUserData = (uid) => {
    const q = query(
        collection(db, "users"),
        where(" uid", "==", uid)
    );
    return getDocs(q);
}

export const loadData = (uid) => {
    const q = query(
        collection(db, "data"),
        where("uid", "==", uid)
    )
    return getDocs(q);
}

export const updateData = (ref, data) => {
    console.log("Updating....");
    const docRef = doc(db, "data", ref);
    updateDoc(docRef, {
        data: data
    })
        .then(res => {
            console.log("Data Updated!");
            console.log(res);
        })
        .catch(err => {
        console.log("Some error occured!");
        console.log(err);
    });
}

/*
import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC1kRq4FKRfBDFOW4t3S50V0wXFPtHFz-A",

  authDomain: "todo-app-57869.firebaseapp.com",

  databaseURL: "https://todo-app-57869-default-rtdb.firebaseio.com",

  projectId: "todo-app-57869",

  storageBucket: "todo-app-57869.appspot.com",

  messagingSenderId: "261839368891",

  appId: "1:261839368891:web:0e08ab9d0b7c4a83af2f9e",

  measurementId: "G-4FM1GCSMJR"

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(
            collection * (db, "users"),
            where("uid", "==", user.uid)
        );
        const docs = await getDocs(q);

        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.log(err);
        alert("Some error occured on our side!");
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        // alert(err.message);
    }
};

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout
}
*/