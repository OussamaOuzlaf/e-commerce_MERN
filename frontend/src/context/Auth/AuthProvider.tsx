import { FC, PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "./Context";

const USERNAME_LOCAL = 'username';
const TOKEN_LOCAL = 'token';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [username, setUsername] = useState<string | null>(localStorage.getItem(USERNAME_LOCAL))
    const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_LOCAL))
    const login = (username: string, token: string) => {
        setUsername(username)
        setToken(token)
        localStorage.setItem(USERNAME_LOCAL, JSON.stringify(username))
        localStorage.setItem(TOKEN_LOCAL, JSON.stringify(token))
    }
    const logOut = () => {
        localStorage.removeItem(USERNAME_LOCAL)
        localStorage.removeItem(TOKEN_LOCAL)
        setUsername(null)
        setToken(null)
    }
    const isAuthenticated = !!token;
    return (
        <AuthContext.Provider value={{username, token, login, isAuthenticated, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}