import { createContext, useEffect, useState } from "react";
import * as authService from "../services/authService.js"
import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as SecureStore from 'expo-secure-store';
import { usePersistedState } from "../hooks/usePersistedState.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig.js";

export const AuthContext = createContext({
    user: null,
    auth: null,
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
    // const [user, setUser] = useState(null);
    const [authState, setAuthState] = useState({
        user:null
    }
        
    );
    const [checkingAuth, setCheckingAuth] = useState(true)

    useEffect(() =>{

        const unsubscribe = onAuthStateChanged(auth,(fireBaseUser) => { 
    // функция на SDK (user-a се запазва и persist) за която се subscribe и при промяна в Auth State извиква callback()
            if (fireBaseUser) { //ако има запазен user в onAuthStateChanged
                setAuthState({
                    user: { // придобива тези параметри
                        id: fireBaseUser.uid,
                        email: fireBaseUser.email,
                        username: fireBaseUser.displayName
                    }
                })
            } else { // ако няма се занулява state-a
                setAuthState({ user: null })
            }
            setCheckingAuth(false)
        })

        

        return () => unsubscribe(); // самата функция е subscribe, за това се извиква като clean up при else-a

        // const loadUser = async () => {
        //     try {
        //         const user = await SecureStore.getItemAsync('user');
        //             if(user) {
        //                 setUser(JSON.parse(user));
        //             }
        //     } catch (error) {
        //         console.error('Failed to load user from SecureStore', error)
        //         await SecureStore.deleteItemAsync('user');
        //         setUser(null)
        //     } finally {
        //         setCheckingAuth(false)
        //     }
        // };

        
        // loadUser();
    }, [])

    const login = async ({email, password}) => {
        try {
            setIsLoading(true);
            // const data = await authService.login(email, password);
            const user = await authService.login(email, password);
            setAuthState({
                user:{
                    id: user.uid,
                    email: user.email,
                    username: user.displayName
                }
            })

            // if(data.accessToken) {
            //     await SecureStore.setItemAsync('userId', data.user.id);
            //     await SecureStore.setItemAsync('user', JSON.stringify(data.user));
            //     await SecureStore.setItemAsync('token', data.accessToken);
            //     setUser(data.user);
            //     setError(null)
            // } else {
            //     await SecureStore.deleteItemAsync('token');
            //     await SecureStore.deleteItemAsync('user');
            //     setUser(null)
            // }

        } catch (error) {
            setError(error.message || 'Error during login')
        } finally {
            setIsLoading(false);
        }
    }
    const register = async ({email, password, username}) => {
        try {
            setIsLoading(true);
            // await authService.register(email, password, username);
            // няма const data защото има нужда от token, който не разпонава и прави hash password, което не става веднага за login

            const user = await authService.register(email, password, username);

            setAuthState({
                user:{
                    id: user.uid,
                    email: user.email,
                    displayName: user.displayName
                }
            })
            
            // const data = await authService.login(email, password) // thats why i do log separetly
            // await SecureStore.setItemAsync('token', data.accessToken);
            // await SecureStore.setItemAsync('userId', data.user.id);
            // await SecureStore.setItemAsync('user', JSON.stringify(data.user));
            // setUser(data.user);

            setError(null);
        } catch (error) {
            setError(error.message || 'Error during Registration')
        } finally {
            setIsLoading(false);
        }
    }

    const logout = async () =>{
        // await SecureStore.deleteItemAsync('token')
        // await SecureStore.deleteItemAsync('userId')
        // setUser(null);}

        try {
            await signOut(auth);
            setAuthState({ user: null })
        } catch (error) {
            setError(error.message || 'Error during logout')
        }
    }

    const clearError = () => setError(null);
    

    const contextValue = {
        isAuthenticated: !!authState.user, // конкретно за .user защотоa authState е object и е винаги truthy след като съществува
        // isAuthenticated: !!user,
        user: authState.user,
        auth: authState,
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