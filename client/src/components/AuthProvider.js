import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [token, setAuthToken] = useState(localStorage.getItem('token') || null)
    const [userId, setUserId] = useState(localStorage.getItem('userId') || null)
    const [isAuthenticated, setIsAuthenticated] = useState(!!token)

    useEffect(()=> {
        console.log("UserId  in AuthProvider: ", userId);
        
    }, [userId])

    useEffect(() => {
        setIsAuthenticated(!!token)
    }, [token])

    const login = (newToken, newUserId) => {
        setAuthToken(newToken)
        setUserId(newUserId)
        localStorage.setItem('token',newToken)
        localStorage.setItem('userId',newUserId)
    }

    const logout = () => {
        setAuthToken(null)
        setUserId(null)
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, token, userId}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext)