import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { createContext, useContext, useState, } from "react";
import { useAuth } from "./useAuth.js";
import { db } from "../firebaseConfig.js";

const LikeContext = createContext();


export function LikeProvider({ children }) {

    const { user } = useAuth();
    const [likesMap, setLikesMap] = useState({});

    const toggleLike = (id) => {
        setLikesMap((previous) => ({
            ...previous,
            [id]: !previous[id],
        }));
    };

    const likeSight = async(sightId) => {
        alert('like')
        try {
            const likeRef = doc(db, 'users', user.id, 'favorites', sightId);

            await setDoc(likeRef, {
                createdAt: new Date()
            });
            
            setLikesMap((previous) => ({
                ...previous,
                [sightId]: true,
            }));            
        } catch (error) {
            console.log(error)
        }
    }

    const unlikeSight = async(sightId) => {

        const likeRef = doc(db,'users', user.id, 'favorites', sightId)
        try {
            await deleteDoc(likeRef);
            
            setLikesMap((previous) => {
                const copy = {...previous}; // създаване на копие (лоша практика е директно да се работи над оригинала)
                delete copy[sightId]; // изтриване на Like-a в копието
                return copy;    // пращане на копието което ще замени оригинала
            });            
        } catch (error) {
            console.log(error)
        }
    }
    
    const contextValue = {
        likesMap,
        setLikesMap,
        likeSight,
        unlikeSight,
    }

    return (
        <LikeContext.Provider value={contextValue}>
            {children}
        </LikeContext.Provider>
    );
}

export const useLike = () => useContext(LikeContext)