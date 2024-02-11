import { onSnapshot, doc, setDoc, collection } from "firebase/firestore";
import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./auth";
import db from "../config/firebase";
import { useRouter } from "next/navigation";

export const PlayerContext = createContext();

export const createProfile = (uid, displayName, img) => {
    setDoc((doc(db, "user", uid)), {
        displayName: displayName,
        img: img
    });
    return displayName;
}

const onPlayerInfoUpdate = (user, getter, setter) => {
    const router = useRouter();
    useEffect(() => {
        if (user) {
            return onSnapshot(doc(db, "user", user.uid), snap => {
                setter({ ...snap.data(), uid: user.uid })
                if (snap?.data()?.status == "in Room") {
                    router.push("/room")
                }
                if (!snap?.data() && router.pathname != "/createProfile") {
                    router.push("/createProfile")
                }
            })
        }
    }, [user])
    return getter
}

export const PlayerProvider = ({ children }) => {
    const { User } = useContext(AuthContext);
    const [Player, setPlayer] = useState({});
    onPlayerInfoUpdate(User, Player, setPlayer)
    return (
        <PlayerContext.Provider value={{ Player }}>{children}</PlayerContext.Provider>
    )
}

