import { ChakraProvider } from "@chakra-ui/react"
import { AuthProvider } from "../lib/auth"
import { PlayerProvider } from "../lib/player"
import { RoomProvider } from "@/lib/Room/Provider"

export const Provider = ({ children }) => (
    <AuthProvider>
        <PlayerProvider>
            <RoomProvider>
                <ChakraProvider>
                    {children}
                </ChakraProvider>
            </RoomProvider>
        </PlayerProvider>
    </AuthProvider>
)