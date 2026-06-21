import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig.js";

export const getUserById = (userId) => {
    
    try {
        const userRef = doc(db, 'users', userId);
        const snapshot = await getDoc(userRef);

        if(!snapshot.exists()) {
            throw new Error('User not found')
        }

        return {
            id: snapshot.id,
            ...snapshot.data()
        };        
    } catch (error) {
        throw new Error(error.message || 'Failed to load user')        
    }

}

export const updateUser = (userId, data) => {
    try {
        const userRef = doc(db, 'user', userId);
        await updateDoc(userRef, data)        
    } catch (error) {
        throw new Error(error.message || 'Failed to update user');        
    }
}