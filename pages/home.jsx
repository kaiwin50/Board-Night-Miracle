import { AuthContext, currentUser } from "@/lib/auth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Container, Box, Input, AbsoluteCenter, Button, Center } from '@chakra-ui/react'
import Chat from "@/components/Chat";


export default () => {
    const router = useRouter()
    const { User } = useContext(AuthContext)
    const [msg, setMsg] = useState("");
    return (
        <main>
            <main className={styles.main}>
                <Container display={"flex"} position={"absolute"} top={0} left={0} p={0}>
                    <Box borderRadius='md' bg='#F6AD55' color='white' p={"20px"} w={[100, 300, 400]}>
                        Display Name : {User?.displayName}
                    </Box>
                </Container >
                <Container display={"flex"} position={"absolute"} top={"0%"} right={"0%"} p={0} w={"auto"}>
                    <Button size={"lg"} variant={"solid"} colorScheme={"gray"} onClick={() => {
                        console.log(auth.app.config.name)
                        signOut(auth).then(() => {
                            router.push("/")
                        })
                    }}>
                        Sign out
                    </Button>
                </Container>
                <Box position={"fixed"} left={"0%"} bottom={"0%"}>
                    <Chat client={User}></Chat>
                </Box>
                <Button borderRadius='100%' h={"10rem"} w={"10rem"} size={"lg"} variant={"solid"} colorScheme={"gray"} onClick={() => {
                }}>
                    Create Room
                </Button>
                <Button borderRadius='100%' h={"10rem"} w={"10rem"} size={"lg"} variant={"solid"} colorScheme={"gray"} onClick={() => {
                }}>
                    Join Room
                </Button>
            </main>
        </main >
    );
}