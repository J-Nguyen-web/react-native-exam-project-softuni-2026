import { createContext, useEffect, useState } from "react";
import * as authService from "../services/authService.js"
import AsyncStorage from "@react-native-async-storage/async-storage";

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
                const token = await AsyncStorage.getItem('token');
                console.log(token)
                    if(token) {
                        setUser({token});
                    }
            } catch (error) {
                await AsyncStorage.removeItem('token');
                setUser(null)
            } finally {
                setCheckingAuth(false)
                
                startUserCheckInterval();
            }
        };

        // json-server-aut doesnt accept the token, за това използвам проверка дали не е изтрит потребителя, 
        // ако случайно оставите телефона си по средата на тестване, защото задреме ли сървъра се изтриват регистрираните потребите
        const startUserCheckInterval = () => {
            const interval = setInterval(async () => {
                const userId = await AsyncStorage.getItem('userId');
                if(!userId) return;
                try {
                    await authService.checkUserExist(userId)
                    console.log(await authService.checkUserExist(userId))
                } catch {
                    await logout();
                }
            },60000)
            return () => clearInterval(interval);
        }
        loadUser();
    }, [])

    const login = async ({email, password}) => {
        try {
            setIsLoading(true);
            const data = await authService.login(email, password);
            if(data.accessToken) {
                await AsyncStorage.setItem('token', data.accessToken);
                await AsyncStorage.setItem('userId', data.user.id);
                setUser(data.user);
                setError(null)
            } else {
                await AsyncStorage.removeItem('token');
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
            // we dont const data bcoz the server needs to work on token and hash the password
            
            const data = await authService.login(email, password) // thats why log separetly

            await AsyncStorage.setItem('token', data.accessToken);
            await AsyncStorage.setItem('userId', data.user.id);
            setUser(data.user);
            setError(null);
        } catch (error) {
            setError(error.message || 'Error during Registration')
        } finally {
            setIsLoading(false);
        }
    }

    const logout = async () =>{
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('userId')
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