import { FC, PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "./Context";
import { BASE_URL } from "../../constant/baseURL";

const USERNAME_LOCAL = 'username';
const TOKEN_LOCAL = 'token';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [username, setUsername] = useState<string | null>(localStorage.getItem(USERNAME_LOCAL))
    const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_LOCAL))
    const [ myOrders, setMyOrders ] = useState([])
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
    const getMyOrders = async () => {
        try {
            const response = await fetch(`${BASE_URL}/user/myOrder`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${JSON.parse(token || "")}`,
                }
            });
            if (!response.ok) {
                return;
            }
            const data = await response.json();
            setMyOrders(data)
        } catch (error) {
        }
    }
    const isAuthenticated = !!token;
    return (
        <AuthContext.Provider value={{ username, token, myOrders, login, 
        isAuthenticated, logOut, getMyOrders }}>
            {children}
        </AuthContext.Provider>
    )
}