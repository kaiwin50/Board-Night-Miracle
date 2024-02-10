import { createContext, useContext, useEffect, useState } from "react"
import db, { auth } from "./firebase"
import { GoogleAuthProvider, signInWithPopup, signOut as FirebaseSignOut, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const provider = new GoogleAuthProvider();


export const signIn = () => signInWithPopup(auth, provider).catch((e) => {
    console.log(e)
});

export const signOut = () => FirebaseSignOut(auth);

export const currentUser = (getter, setter) => {
    const router = useRouter();
    console.log("cur : ")
    useEffect(() => {
        return onAuthStateChanged(auth, async (user) => {
            console.log("user : ", user)
            if (user) {
                const ref = await getDoc(doc(db, "user", user.uid));
                if (ref.data()) {
                    setter({ ...ref.data(), uid: user.uid })
                }
                else {
                    setter({ uid: user.uid })
                    router.push("/createProfile")
                }
            }
            else {
                router.push("/")
            }
        });
    }, []);

    return getter;
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [User, setUser] = useState();
    currentUser(User, setUser);

    return (
        <AuthContext.Provider value={{ User, setUser }}>{children}</AuthContext.Provider>
    )
}

export const createProfile = (uid, displayName) => {
    setDoc(doc(db, "user", uid), {
        displayName: displayName
    });
    return displayName;
} 