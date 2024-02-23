import { AuthProvider } from "@/lib/auth";
import db from "@/config/firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Box, AbsoluteCenter, Button } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { PlayerContext } from "@/lib/player";
import { JoinRoom } from "./Gateway";
import { EnterIcon } from 'chakra-ui-ionicons';

export const RoomList = () => {
    const [list, setList] = useState([]);
    const q = query(collection(db, "room"), orderBy("createAt"));
    const { getDisclosureProps, getButtonProps } = useDisclosure();
    const {Player} = useContext(PlayerContext);
    const buttonProps = getButtonProps();
    const disclosureProps = getDisclosureProps();
    useEffect(() => {
        onSnapshot(q, snap => {
            setList([])
            snap.docs.map((doc) => {
                setList(old => ([...old, { ...doc.data(), rid: doc.id }]))
            })
        })
    }, [])
    return (
        <>
            <Button {...buttonProps} borderRadius='100%' h={"10rem"} w={"10rem"} size={"lg"} variant={"solid"} colorScheme={"gray"}>
                Open Room List
            </Button>
            <AbsoluteCenter borderRadius={"xl"} {...disclosureProps} w={"80%"} h={"80vh"} bg={"#a85507"} p={"1rem"}>
                <Box borderRadius={"xl"} display={"flex"} p={"1rem"} marginBottom={"1rem"} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} w={"100%"} bg={"#db7617"}>
                    <Box>Room List</Box>
                    <Button justifyContent={"flex-end"} bg={"#ffe48b"} borderRadius={"xl"} p={"1rem"} {...buttonProps}> X </Button>
                </Box>
                <Box borderRadius={"xl"} p={".5rem"} overflowY={"auto"} h={"80%"} bg={"#cf6705"}>
                    <br />
                    {
                        list?.map(({ rid, host, createAt }) => {
                            return (<Button bg={"#ffe48b"} w={"100%"} borderRadius={"xl"}
                             margin={".2rem"} p={"1rem"} key={rid} onClick={ () => JoinRoom(rid, Player)}> {rid} | {host} | {createAt?.toDate()?.toLocaleTimeString("en-US")} | <EnterIcon w={6} h={6} /> </Button>)
                        })
                    }
                </Box>
            </AbsoluteCenter>
        </>
    )
}