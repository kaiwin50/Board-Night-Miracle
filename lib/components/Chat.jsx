import { useContext, useEffect, useRef, useState } from "react";
import { Container, Box, Input, Button, Grid, GridItem } from '@chakra-ui/react'
import { FormControl } from '@chakra-ui/react'
import { useRouter } from "next/navigation";
import { addDoc, collection, onSnapshot, serverTimestamp, orderBy, query } from "firebase/firestore";
import db from "@/config/firebase";
import { PlayerContext } from "../player";

export default () => {
    const router = useRouter();
    const { Player } = useContext(PlayerContext);
    const [message, setMsg] = useState("");
    const [chatLog, setChatLog] = useState([]);
    const dummy = useRef(null);
    const msgInput = useRef(null);

    const SentMessage = (e) => {
        e.preventDefault();
        if (message) {
            addDoc(collection(db, "chat"), {
                msg: message,
                sender: Player.displayName,
                senderUid: Player.uid,
                timestamp: serverTimestamp()
            });
        }
        setMsg("")
        msgInput.current.value = ""
        console.log()
    }
    
    useEffect(() => {
            dummy.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [chatLog])

    useEffect(()=>{
        const q = query(collection(db, "chat"), orderBy("timestamp"))
            onSnapshot(q, snap => {
                setChatLog([])
                snap.docs.map((doc) => {
                    setChatLog(old => [...old, doc.data()])
                })
            })
    }, [router.isReady])
    return (
        <Container position={"relative"} bottom={"0%"} left={"0%"} margin={0} p={0} h={"15rem"} w={"28rem"}>
            <Box borderRadius='md' position={"absolute"} bg='#F6AD55' color='white' w={"100%"} h={"100%"}>
                <Box borderRadius='md' position={"relative"} overflowY={"auto"} display={"flex"} flexDirection={"column"} bg='#f67855' color='white' w={"100%"} h={"85%"}>
                    {chatLog?.map(({ msg, sender, senderUid, timestamp }, index) => {
                        const time = timestamp?.toDate()?.toLocaleTimeString('en-US')
                        return (
                            <Box key={sender + index} alignSelf={senderUid === Player?.uid ? "flex-end" : "none"} position={"relative"}>
                                <b>{sender} : </b>
                                <Box borderRadius='20rem' w={"fit-content"} px={"1.5rem"} py={".5rem"} bg='#ffdcc4' color={"#000"} >
                                    {msg}<br />
                                </Box>
                                {time}
                            </Box>
                        )
                    })}
                    <div ref={dummy}></div>
                </Box>
                <form onSubmit={SentMessage}>
                    <FormControl>
                        <Grid position={"absolute"} bottom={"0%"} w={"100%"} h={"15%"}
                            templateColumns='repeat(5, 1fr)'>
                            <GridItem colSpan={4}>
                                <Input ref={msgInput} bg={'FFF'} display={"flex"} w={"25rem"} color={'gray'} placeholder='Enter your message.' size='md' onChange={(e) => {
                                    setMsg(e.currentTarget.value)
                                }}></Input>
                            </GridItem>
                            <GridItem colSpan={1}>
                                <Button type={"submit"} w={"100%"} display={"flex"}>send</Button>
                            </GridItem>
                        </Grid>
                    </FormControl>
                </form>
            </Box>
        </Container>
    );
}