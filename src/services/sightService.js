import api from "./api.js";

export async function getAll(){
    const response = await api.get('/sights');

    return response.data
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

export async function update(id, updatedSight) {
    if (!id) throw new Error('No entry with such id!');
    const response = await api.put(`/sights/${id}`, updatedSight);
    return response.data;
}

export async function deleteSight(id) {
    if (!id) throw new Error('No entry with such id!');
    return await api.delete(`/sights/${id}`)
}