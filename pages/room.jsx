import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Container, Box, Input, AbsoluteCenter, Button } from '@chakra-ui/react'
import Chat from "@/lib/components/Chat";
import { PlayerContext } from "@/lib/player";
import { RoomContext } from "@/lib/Room/Provider";
import { LeaveRoom } from "@/lib/Room/Gateway";
import { getRoomProfile } from "@/lib/Room/List";
import { doc, getDoc } from "firebase/firestore";
import db from "@/config/firebase";
import { Image } from '@chakra-ui/react'
import { ExitIcon } from 'chakra-ui-ionicons';

export default () => {
    const router = useRouter()
    const { Player } = useContext(PlayerContext)
    const { Room } = useContext(RoomContext)
    return (
        <main className={styles.main}>
            <Container display={"flex"} position={"absolute"} top={0} left={0} p={0}>
                <Box borderRadius='md' bg='#F6AD55' color='white' p={"20px"} w={[100, 300, 400]}>
                    Room ID : {Room?.rid}
                </Box>
            </Container >
            <Container display={"flex"} position={"absolute"} top={"0%"} right={"0%"} p={0} w={"auto"}>
                <Button size={"lg"} variant={"solid"} colorScheme={"red"} onClick={() => {
                    LeaveRoom(Room?.rid, Player)
                    router.push("/home")
                }}>
                    <ExitIcon w={6} h={6} />
                    leave
                </Button>
            </Container>
            <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} w={"80vw"}>
                {Room?.player?.map((uid, index) => {
                    return (
                        <Box bg={"#fff"} borderRadius={"2rem"} display={"flex"} h={"250px"} w={"250px"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} mx={"20px"} key={index}>
                            <Image borderRadius={"100%"} src={Room.profile[uid].img}></Image>
                            {Room.profile[uid].displayName}
                        </Box>
                    )
                })}
            </Box>
            <Chat></Chat>

            <Box position={"fixed"} left={"0%"} bottom={"0%"}>
            </Box>
        </main>
    );
}