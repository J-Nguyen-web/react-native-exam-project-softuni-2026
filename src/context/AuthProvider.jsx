import { createContext, useEffect, useState } from "react";
import { authService } from "../services/index.js"; // make sure this is correct
// import { signOut, onAuthStateChanged } from "firebase/auth"; // if using Firebase

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [authState, setAuthState] = useState({ user: null, accessToken: null });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const login = async (email, password) => {
        try {
            setIsLoading(true);
            const { user, accessToken } = await authService.login(email, password);
            setAuthState({ user, accessToken });
        } catch (err) {
            setError(err.message || "Error during login");
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email, password, username) => {
        try {
            setIsLoading(true);
            const { user, accessToken } = await authService.register(email, password, username);
            setAuthState({ user, accessToken });
        } catch (err) {
            setError(err.message || "Error during registration");
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await signOut(authService.auth);
            setAuthState({ user: null, accessToken: null });
        } catch (err) {
            setError(err.message || "Error during logout");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: !!authState.user,
                isLoading,
                error,
                user: authState.user,
                auth: authState,
                login,
                register,
                logout,
                clearError: () => setError(null),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}