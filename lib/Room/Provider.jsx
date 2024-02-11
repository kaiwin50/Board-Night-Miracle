import db from "@/config/firebase";
import { PlayerContext } from "@/lib/player";
import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

export const onRoomUpdate = (player, setter) => {
    useEffect(() => {
        if (player.status == "in Room" && player.inRoom) {
            console.log("is in")
            onSnapshot(doc(db, "room", player.inRoom), snap => {
                setter({ ...snap.data(), rid: snap.id })
            })
        }
        console.log(player.inRoom)
    }, [player.inRoom])
}

export const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
    const { Player } = useContext(PlayerContext);
    const [Room, setRoom] = useState({});
    onRoomUpdate(Player, setRoom)
    return (
        <RoomContext.Provider value={{ Room }}>{children}</RoomContext.Provider>
    )
}