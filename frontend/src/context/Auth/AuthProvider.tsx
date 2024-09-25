import { FC, PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "./Context";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [username, setUsername] = useState<string | null>(localStorage.getItem('username'))
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'))

    const login = (username: string, token: string) => {
        setUsername(username)
        setToken(token)
        localStorage.setItem('username', JSON.stringify(username))
        localStorage.setItem('token', JSON.stringify(token))
    }
    const isAuthenticated = !!token;
    return (
        <AuthContext.Provider value={{username, token, login, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}