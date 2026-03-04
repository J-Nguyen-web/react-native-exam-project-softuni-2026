import { createContext, useState } from "react";
import * as authService from "../services/authService.js"

export const AuthContext = createContext({});

export function AuthProvider({ children}) {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const login = async ({email, password}) => {
        try {
            setIsLoading(true);
            const loggedUser = await authService.login(email, password);
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
            const newUser = await authService.register(email, password, username);
            setUser(newUser);
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