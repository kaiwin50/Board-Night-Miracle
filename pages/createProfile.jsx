import { Container, Box, Input, AbsoluteCenter, Button, Center } from '@chakra-ui/react'
import styles from "@/styles/Home.module.css";

export default () => {
    return (
        <>
            <main className={styles.main}>
                <Container>
                    <AbsoluteCenter >
                        <Box borderRadius='md' bg='#F6AD55' color='white' p={20} w={[100, 300, 400]}>
                            <Input bg={'FFF'} placeholder='Display name' size='md'></Input>
                            <Center p={5}>
                                <Button size={"lg"} variant={"solid"} colorScheme={"gray"} onClick={() => {
                                    
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