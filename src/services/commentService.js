import {
    addDoc,
    collection,
    query,
    where,
    orderBy,
    getDocs,
    onSnapshot, // for real time updates when somebody send a comment
    serverTimestamp
} from 'firebase/firestore';

import { db } from '../firebaseConfig.js';

const commentsRef = collection(db, 'comments');

const create = async(commentData) => {
    const result = await addDoc(commentsRef, {
        ...commentData,
        createdAt: serverTimestamp()
    });

    return result;
    };

    // const getBySightId = async(sightId) => { // manual reload after updateconst queryData = query(commentsRef,where('sightId', '==', sightId),orderBy('createdAt', 'desc'));
        // const result = await getDocs(queryData);
        // return result.docs.map(doc => ({ // the result from firebase is not plain JS thats why result got .docs which we map
        //     id: doc.id,                  // using the id of the data
        //     ...doc.data()                // and spreading it into JS object that react can use
        // }));

    const subscribeToComments = async(sightId, callback) => {
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
        create,
        subscribeToComments,
        // getBySightId,
}