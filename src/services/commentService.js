import {
    addDoc,
    collection,
    query,
    where,
    orderBy,
    getDocs,
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

    const getBySightId = async(sightId) => {
        const queryData = query(
            commentsRef,
            where('sightId', '==', sightId),
            orderBy('createdAt', 'desc')
        );

        const result = await getDocs(queryData);

        return result.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    }

    export default {
        create,
        getBySightId
}