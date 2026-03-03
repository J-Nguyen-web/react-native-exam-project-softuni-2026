import { api } from "./api.js";

export async function login(email, password) {
    const result = await api.post('/login', {email, password});

    return result.data;
}

export async function register(email, password, username) {
    const result = await api.post('/register', {email, password, username});

    return result.data;
}