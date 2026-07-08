import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig.js";

export async function createUser(user) {
    try {
        await setDoc(doc(db, "users", user.uid), {
            username: user.displayName,
            email: user.email,
            photoUrl: "",
            createdAt: serverTimestamp(),
        })        
    } catch (error) {
        console.log(error.message)
    }

}
export const getUserById = async (userId) => {
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

export const updateUser = async (userId, data) => {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, data)        
    } catch (error) {
        throw new Error(error.message || 'Failed to update user');        
    }
}