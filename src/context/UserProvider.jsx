import { createContext, useContext, useEffect, useState } from "react";
import * as userService from '../services/userService.js'
import { useAuth } from "./useAuth.js";

export const UserContext = createContext();

export function UserProvider({children}) {

    const {user} = useAuth();

    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user?.id) return

        const loadUser = async () => {
            try {
                setIsLoading(true)
                const profile = await userService.getUserById(user.id);

                setUserProfile(profile)
                setError(false)
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
            }

        }
        loadUser();
        
    }, [user])

    const getUser = async(userId) => {
        try {
            setIsLoading(true)
            const user = await userService.getUserById(userId);

            setUserProfile(user)
            setError(null)

            return user;
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    };

    const updateUser = async (userData) => {
        try {
            if (!user?.id) return

            setIsLoading(true)

            await userService.updateUser(user.id, userData);
            
            setUserProfile(previous => ({
                ...previous,
                ...userData
            }));

            setError(null)
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    };
    
    const contextValue = {
        isLoading,
        userProfile,
        error,
        getUser,
        updateUser,
    }

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);