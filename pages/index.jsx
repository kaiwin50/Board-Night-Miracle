import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from '@chakra-ui/react'
import { LogoGoogleIcon } from 'chakra-ui-ionicons';
import { signIn } from "@/lib/auth";
import { auth } from "@/lib/firebase";

export default function signInPage() {
  const router = useRouter()
  const [user, setUser] = useState({})

  useEffect(() => {
    console.log(auth)
  }, [auth])
  return (
    <main className={styles.main}>
      <div className={styles.loginButton}>
        <Button size={"lg"} variant={"solid"} colorScheme={"gray"} leftIcon={<LogoGoogleIcon />} onClick={() => {
          signIn().then((user) => {
            router.push("/home")
            console.log(user)
          })
        }}>
          Fetch User Data
        </Button>
      </div>
    </main>
  );
}