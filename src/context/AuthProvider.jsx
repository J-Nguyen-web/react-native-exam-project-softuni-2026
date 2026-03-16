import { createContext, useEffect, useState } from "react";
import * as authService from "../services/authService.js"
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';

export const AuthContext = createContext({
    user: null,
    isLoading: false,
    error: null,
    login: async () => {},
    register: async () => {},
    logout: () => {},
    clearError: () => {},
});

export function AuthProvider({ children}) {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true)

    useEffect(() =>{
        const loadUser = async () => {
            try {
                const user = await SecureStore.getItemAsync('user');
                console.log('user  ',user)
                    if(user) {
                        setUser(JSON.parse(user));
                    }
            } catch (error) {
                console.error('Failed to load user from SecureStore', error)
                await SecureStore.deleteItemAsync('user');
                setUser(null)
            } finally {
                setCheckingAuth(false)
            }
        };

        
        loadUser();
    }, [])

    const login = async ({email, password}) => {
        try {
            setIsLoading(true);
            const data = await authService.login(email, password);
            if(data.accessToken) {
                await SecureStore.setItemAsync('userId', data.user.id);
                await SecureStore.setItemAsync('user', JSON.stringify(data.user));
                await SecureStore.setItemAsync('token', data.accessToken);
                setUser(data.user);
                setError(null)
            } else {
                await SecureStore.deleteItemAsync('token');
                await SecureStore.deleteItemAsync('user');
                setUser(null)
            }
        } catch (error) {
            setError(error.message || 'Error during login')
        } finally {
            setIsLoading(false);
        }
    }
    const register = async ({email, password, username}) => {
        try {
            setIsLoading(true);
            await authService.register(email, password, username);
            // няма const data защото има нужда от token, който не разпонава и прави hash password, което не става веднага за login
            
            const data = await authService.login(email, password) // thats why i do log separetly

            await SecureStore.setItemAsync('token', data.accessToken);
            await SecureStore.setItemAsync('userId', data.user.id);
            await SecureStore.setItemAsync('user', JSON.stringify(data.user));

            setUser(data.user);
            setError(null);
        } catch (error) {
            setError(error.message || 'Error during Registration')
        } finally {
            setIsLoading(false);
        }
    }

    const logout = async () =>{
        await SecureStore.deleteItemAsync('token')
        await SecureStore.deleteItemAsync('userId')
        setUser(null);}  

    const clearError = () => setError(null);
    

    const contextValue = {
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        checkingAuth,
        clearError,
        logout,
        login,
        register,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}