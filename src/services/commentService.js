import {
    addDoc,
    collection,
    query,
    where,
    orderBy,
    getDocs,
    onSnapshot, // for real time updates when somebody send a comment
    serverTimestamp,
    updateDoc,
    deleteDoc,
    doc,
    getDoc
} from 'firebase/firestore';

import { db } from '../firebaseConfig.js';
const commentsRef = collection(db, 'comments');

const getAllComments = async() => {

        const commentsRef = collection(db, 'comments');

        const snapshot = await getDocs(commentsRef);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }))
}

const create = async(commentData) => {
    const result = await addDoc(commentsRef, {
        ...commentData,
        createdAt: serverTimestamp()
    });

    return result;
};

const update = async(commentId, commentContent) => {
    const commentsRef = doc(db, 'comments', commentId);

    await updateDoc(commentsRef, {text: commentContent});
};

const remove = async(commentId) => {
    return await deleteDoc(doc(db, 'comments', commentId))
}

    // const getBySightId = async(sightId) => { // manual reload after updateconst queryData = query(commentsRef,where('sightId', '==', sightId),orderBy('createdAt', 'desc'));
        // const result = await getDocs(queryData);
        // return result.docs.map(doc => ({ // the result from firebase is not plain JS thats why result got .docs which we map
        //     id: doc.id,                  // using the id of the data
        //     ...doc.data()                // and spreading it into JS object that react can use
        // }));

    const subscribeToComments = (sightId, callback) => { // if its async returns object as promise and not doing the function
        const queryData = query(
            commentsRef,
            where('sightId', '==', sightId),
            orderBy('createdAt', 'desc')
        );

        return onSnapshot(queryData, snapshot => { 
            const comments = snapshot.docs.map(doc => ({  
                id: doc.id, 
                ...doc.data()
            }));
            
            callback(comments)
        });
    }

    export default {
        getAllComments,
        create,
        update,
        remove,
        subscribeToComments,
        // getBySightId,
}