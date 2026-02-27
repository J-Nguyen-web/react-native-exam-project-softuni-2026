import api from "./api.js";

export async function getAll(){
    return await api.get('/sights');
}

export async function create(sight) {
    const newSight = await api.post('/sights', sight);

    return newSight.data;
}

export async function getById(id){
    if(!id){ throw new Error('No entry with such id!') }
    
    const sightById = await api.get(`/sights/${id}`);
    return sightById.data;
}

export async function deleteSight(id) {
    return await api.delete(`/sights/${id}`)
}