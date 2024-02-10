import { Container, Box, Input, AbsoluteCenter, Button, Center } from '@chakra-ui/react'
import styles from "@/styles/Home.module.css";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import db, { auth } from '@/lib/firebase';
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { AuthContext, createProfile, currentUser, currentUserID } from '@/lib/auth';
import { useRouter } from 'next/navigation';


export default () => {
    const {User, setUser} = useContext(AuthContext)
    const router = useRouter()
    const [displayName, setDisplayName] = useState("");
    return (
        <>
            <main className={styles.main}>
                <Container>
                    <AbsoluteCenter >
                        <Box borderRadius='md' bg='#F6AD55' color='white' p={20} w={[100, 300, 400]}>
                            <Input bg={'FFF'} color={'gray'} placeholder='Display name' size='md' onChange={(e)=>{
                                setDisplayName(e.currentTarget.value)
                            }}></Input>
                            <Center p={5}>
                                <Button size={"lg"} variant={"solid"} colorScheme={"gray"} onClick={async () => {
                                    onSnapshot(doc(db, "user", User.uid), (snap)=>{
                                        setUser({...snap.data(), uid: snap.id})
                                        router.push("/home")
                                    })
                                    createProfile(User.uid, displayName)
                                    
                                }}>
                                    Confirm
                                </Button>
                            </Center>
                        </Box>
                    </AbsoluteCenter>
                </Container >
            </main>
        </>
    );
}
