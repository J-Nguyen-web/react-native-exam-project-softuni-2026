import  api  from "./api.js";

export async function login(email, password) {
    const res = await api.get(`/users?email=${email}&password=${password}`);
    if(res.data.length === 0) {
        throw new Error("Not valid email or password");
    }
    return res.data[0];
}

export async function register(email, password, username) {
    const existing = await api.get(`/users?email=${email}`);
    if (existing.data.length> 0){
        throw new Error("User already exist with this email");
    }
    
    const res = await api.post('/users', {email, password, username});

    return res.data;
}