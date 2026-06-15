import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import api from "./api.js";
import { db } from "../firebaseConfig.js";

const endpoint = "/ratings"


export async function createRating(rate) {
    // const newRating = await api.post(endpoint, rate);
    // return newRating.data;

    const ratingRef = await addDoc(collection(db, 'ratings'), rate)
    return {id: ratingRef.id, ...rate}
}

export async function getUserRating(sightId, userId) {
    // const res = await api.get(`${endpoint}?sightId=${sightId}&userId=${userId}`);
    // return res.data[0];

    const q = query(
        collection(db,"ratings"),
        where("sightId", "==", sightId),
        where("userId", "==", userId)
    )
    
    const snap = await getDocs(q);

    if (snap.empty) return null;

    return {
        id: snap.docs[0].id,
        ...snap.docs[0].data()
    };
}
export async function getSightRating(rateId){
    // if(!rateId){ throw new Error('No entry with such id!') }
    // const sightRating = await api.get(`${endpoint}/${rateId}`);
    // return sightRating.data;

    const sightRatingRef = await getDoc(doc( db, 'ratings', rateId));

    return {
        id: sightRatingRef.id,
        ...sightRatingRef.data()
    }
}

export async function getAllRatings(){
    // const ratings = await api.get(endpoint);
    // if(!Array.isArray(ratings.data)){throw new Error('Ratings are not array')}
    // return ratings.data;

    const querySnapshot = await getDocs(collection(db,'ratings'))
    const ratings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) //querySNap=a има специални мета-данни
// използваме id-тата за да създадем Key за обект с value doc.data спредната за даденото id за всеки записан sight
    return ratings
}

export async function updateRating(rateId, updatedRating) {
    // if (!rateId) throw new Error('No entry with such id!');
    // const res = await api.put(`${endpoint}/${rateId}`, updatedRating);
    // return res.data;

    const ratingRef = doc(db, 'ratings', rateId);

    await updateDoc(ratingRef, updatedRating)

    return { id: rateId, ...updatedRating}
}