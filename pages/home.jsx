import { currentUser } from "@/lib/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default () => {
    const router = useRouter()
    const [userInfo, setUserInfo] = useState()
    currentUser(userInfo, setUserInfo)

    console.log(userInfo)
    
    useEffect(()=>{
        
    }, [])
    return (
        <main>
            name: {userInfo?.name}
        </main>
    );
}