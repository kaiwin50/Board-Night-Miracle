import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Container, Box, Input, AbsoluteCenter, Button } from '@chakra-ui/react'
import Chat from "@/lib/components/Chat";
import { PlayerContext } from "@/lib/player";
import { RoomContext } from "@/lib/Room/Provider";
import { LeaveRoom } from "@/lib/Room/Gateway";

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
                    leave
                </Button>
            </Container>
            <Box>
                {Room?.player?.map(({ displayName, uid }, index) => {
                    return (<Box bg={"#fff"} key={uid + index}>{displayName} ({uid}) </Box>)
                })}
            </Box>
            <Box position={"fixed"} left={"0%"} bottom={"0%"}>
                <Chat></Chat>
            </Box>
        </main>
    );
}