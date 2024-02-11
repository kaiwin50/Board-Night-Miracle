import db from "@/config/firebase"
import { addDoc, collection, deleteDoc, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore"

export const CreateRoom = async (player) => {
    const room = await addDoc(collection(db, "room"), {
        host: player.displayName,
        player: [],
        createAt: serverTimestamp()
    });
    JoinRoom(room.id, player);
}

export const JoinRoom = async (rid, player) => {
    const roomData = await getDoc(doc(db, "room", rid))
    updateDoc(doc(db, "user", player.uid), {
        inRoom: rid,
        status: "in Room"
    });
    updateDoc(doc(db, "room", rid), {
        player: [...roomData?.data().player, player.uid]
    });
}

export const LeaveRoom = async (rid, player) => {
    const roomData = await getDoc(doc(db, "room", rid));
    const playerList = roomData?.data().player;
    const playerIndex = playerList?.indexOf(player.uid);
    if (playerIndex > -1) {
        playerList.splice(playerIndex, 1);
        if (playerList.length == 0) {
            deleteDoc(doc(db, "room", rid));
        }
        else {
            if (roomData.host == player.displayName) {
                updateDoc(doc(db, "room", rid), {
                    player: playerList,
                    host: playerList[0]
                });
            }
            else {
                updateDoc(doc(db, "room", rid), {
                    player: playerList
                });
            }
        }
        updateDoc(doc(db, "user", player.uid), {
            inRoom: "",
            status: "online"
        });
    }
}