import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import api from "../service/api";

const userContext = createContext()

export const UserProvider = ({children}) => {
    const {userId, token} = useAuth()
    const [currentUser, setCurrentUser] = useState({})
    const [loading, setLoading] = useState(true)

    const fetchUser = async (id) => {
        if (!id) return 
        setLoading(true)
        try {
            
            const res = await api.get(`/users/${id}`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            setCurrentUser(res.data)
        } catch (error) {
            console.error('Error fetching current user', error);
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchUser(userId)
    }, [userId])

    return (
        <userContext.Provider  value={{currentUser, setCurrentUser, fetchUser}}>
            {children}
        </userContext.Provider>
    )
}
export const  useUser =()=> useContext(userContext)