import api from "./api.js";

export function getAll(){
    return api.get('/sights');
}

export function getById(id){
    if(!id){
        throw new Error('No entry with that id!')
    }
    
    return api.get(`/sights/${id}`);
}