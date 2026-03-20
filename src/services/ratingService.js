import api from "./api.js";

const endpoint = "/rating"


export async function create(sight) {
    const newSight = await api.post(`${endpoint}`, sight);
    return newSight.data;
}

export async function getSightRating(sightId){
    if(!id){ throw new Error('No entry with such id!') }
    
    const sightById = await api.get(`${endpoint}/${sightId}`);
    return sightById.data;
}

export async function update(sightId, updatedRating) {
    if (!id) throw new Error('No entry with such id!');
    const response = await api.put(`${endpoint}/${sightId}`, updatedRating);
    return response.data;
}