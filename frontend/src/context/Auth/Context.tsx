import { createContext, useContext } from "react"

interface AuthContextType {
    username: string | null;
    token: string | null;
    login: (username: string, token: string) => void;
    isAuthenticated: boolean;
    logOut: () => void;
    getMyOrders: () => void;
    myOrders: any[]
}

export const AuthContext = createContext<AuthContextType>(
    { username: null, token: null, login: () => { }, isAuthenticated: false, 
    logOut: () => { }, getMyOrders: () => {}, myOrders: [] }
)

export const useAuth = () => useContext(AuthContext)