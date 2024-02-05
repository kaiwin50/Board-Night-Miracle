import { useEffect, useState } from "react"
import db, { auth } from "./firebase"
import { GoogleAuthProvider, signInWithPopup, signOut as FirebaseSignOut, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const provider = new GoogleAuthProvider();


export const signIn = () => signInWithPopup(auth, provider).catch((e) => {
    console.log(e)
});

export const signOut = () => FirebaseSignOut(auth);

export const currentUser = (getter, setter) => {
    const router = useRouter();

    useEffect(() => {
        return onAuthStateChanged(auth, async (user) => {
            const ref = await getDoc(doc(db, "user", user.uid));
            console.log("currentUser: ", ref.data())
            if (ref.data()) {
                console.log("refData: ", ref.data())

                setter(ref.data())
            }
            else {
                router.push("/createProfile")
            }
        });
    }, []);

    return getter;
}

export const setUserDisplayname = (name) => {
    const [user, setUser] = useState({})
    
}