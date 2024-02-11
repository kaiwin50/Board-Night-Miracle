import { createContext, useContext, useEffect, useState } from "react"
import db, { auth } from "@/config/firebase"
import { GoogleAuthProvider, signInWithPopup, signOut as FirebaseSignOut, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const provider = new GoogleAuthProvider();


export const signIn = () => signInWithPopup(auth, provider).catch((e) => {
    console.log(e)
});

export const signOut = () => FirebaseSignOut(auth);

export const currentUser = (getter, setter) => {
    useEffect(() => {
        return onAuthStateChanged(auth, async (user) => {
            setter(user)
            console.log("Userasd", user)
        });
    }, []);
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [User, setUser] = useState();
    currentUser(User, setUser);
    return (
        <AuthContext.Provider value={{ User, setUser }}>{children}</AuthContext.Provider>
    )
}

