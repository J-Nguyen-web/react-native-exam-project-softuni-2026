import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import api from "./api.js";

export async function getAll(){
const querySnapshot = await getDocs(collection(db, 'sights'));

if(!querySnapshot) return [];

const sights = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) //querySNap=a има специални мета-данни
// използваме id-тата за да създадем Key за обект с value doc.data спредната за даденото id за всеки записан sight

return sights;

    // const response = await api.get('/sights');
    // return response.data
}

export async function create(sight) {
    // const newSight = await api.post('/sights', sight);
    // return newSight.data;

    const ref = await addDoc(collection(db, 'sights'), sight);
    return { id: ref.id, ...sight}; // ref съдържа мета данни и ни праща само id като разчита че sight който сме пратили е при нас, за да спести трафик
}

export async function getById(sightId){

    const sight = await getDoc(doc(db, 'sights', sightId));

    return { 
        id: sight.id, 
        ...sight.data(),
        // конвертиране на firebase тип датата(timeStamp) към JS type за да може да се визуализира
        startDate: sight.data().startDate?.toDate(),
        endDate: sight.data().endDate?.toDate(),
        }; 
    // result съдържа мета данни и ни праща само id като разчита че sight който сме пратили е при нас, за да спести трафик
    // if(!id){ throw new Error('No entry with such id!') }
    
    // const sightById = await api.get(`/sights/${id}`);
    // return sightById.data;
}

export async function update(sightId, updatedSight) {

    const sightRef = doc(db, 'sights', sightId)

    await updateDoc(sightRef,updatedSight);

    return {
        id: sightId,
        ...updatedSight,
    }
    // if (!id) throw new Error('No entry with such id!');
    // const response = await api.put(`/sights/${id}`, updatedSight);
    // return response.data;
}

export async function deleteSight(sightId) {
    return await deleteDoc(doc(db, 'sights' , sightId));
    // if (!id) throw new Error('No entry with such id!');
    // return await api.delete(`/sights/${id}`)
}