import api from "./api.js";

const endpoint = "/ratings"


export async function createRating(rate) {
    const newRating = await api.post(endpoint, rate);
    return newRating.data;
}

export async function getUserRating(sightId, userId) {
    const res = await api.get(`${endpoint}?sightId=${sightId}&userId=${userId}`);
    return res.data[0];
}
export async function getSightRating(rateId){
    if(!rateId){ throw new Error('No entry with such id!') }
    
    const sightRating = await api.get(`${endpoint}/${rateId}`);
    return sightRating.data;
}

export async function getAllRatings(){
    const ratings = await api.get(endpoint);

    if(!Array.isArray(ratings.data)){
        throw new Error('Ratings are not array')
    }

    return ratings.data;
}

export async function updateRating(rateId, updatedRating) {
    if (!rateId) throw new Error('No entry with such id!');
    const res = await api.put(`${endpoint}/${rateId}`, updatedRating);
    return res.data;
}