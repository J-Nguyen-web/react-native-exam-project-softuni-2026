import api from "./api.js";

export function getAll(){
    return api.get('/sights');
}