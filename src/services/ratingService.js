import api from "./api.js";

const endpoint = "/rating"


export async function create(sight) {
    const newRating = await api.post(`${endpoint}`, sight);
    return newRating.data;
}

export async function getSightRating(sightId){
    if(!id){ throw new Error('No entry with such id!') }
    
    const sightRating = await api.get(`${endpoint}/${sightId}`);
    return sightRating.data;
}

export async function update(sightId, updatedRating) {
    if (!id) throw new Error('No entry with such id!');
    const response = await api.put(`${endpoint}/${sightId}`, updatedRating);
    return response.data;
}