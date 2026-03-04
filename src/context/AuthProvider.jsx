import { createContext, useState } from "react";
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

    const login = async ({email, password}) => {
        try {
            setIsLoading(true);
            const data = await authService.login(email, password);
            await AsyncStorage.setItem("token", data.accessToken);

            setUser(loggedUser);
            setError(null);
        } catch (error) {
            setError(error.message || 'Error during login')
        } finally {
            setIsLoading(false);
        }
    }
    const register = async ({email, password, username}) => {
        try {
            setIsLoading(true);
            const data = await authService.register(email, password, username);
            await AsyncStorage.setItem("token", data.accessToken);

            // await login(email, password)
            setUser(data.user);
            setError(null);
        } catch (error) {
            setError(error.message || 'Error during Registration')
        } finally {
            setIsLoading(false);
        }
    }

    const logout = () =>  setUser(null);

    const clearError = () => setError(null);
    

    const contextValue = {
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
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