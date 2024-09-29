"use client"

import { createContext, useContext } from "react"

interface AuthContextType {
    username: string | null;
    token: string | null;
    login: (username: string, token: string) => void;
    isAuthenticated: boolean;
    logOut: () => void;
}

export const AuthContext = createContext<AuthContextType>(
    { username: null, token: null, login: () => { }, isAuthenticated: false, logOut: () => { } }
)

export const useAuth = () => useContext(AuthContext)