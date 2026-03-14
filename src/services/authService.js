const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export async function login(email, password) {
    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if(!res.ok) {
        const err  = await res.text()
        console.log('LOGIN ERROR ', err)

        throw new Error("Wrong email or password")
    }

    return res.json();
}

export async function register(email, password, username) {

    const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
    });

    if(!res.ok) {
        const err = await res.text();
        console.log("Register ERROR", err);

        throw new Error("Email already exist!")
    }

    return await res.json();
}

export async function getProfile(token) { 

    const res = await fetch(`${BASE_URL}/profile`,{ // не връща и не приема token-a, за това е функцията checkUser
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) {
        throw new Error("Not valid token")
    }

    return res.json();
}

export async function checkUserExist(userId){
    const res = await fetch(`${BASE_URL}/users/${userId}`);

    if(!res.ok) {
        throw new Error("User not found");
    }
    return res.json();
}
// import  api  from "./api.js";

// export async function login(email, password) {
//     const res = await api.get(`/users?email=${email}&password=${password}`);
//     if(res.data.length === 0) {
//         throw new Error("Not valid email or password");
//     }
//     return res.data[0];
// }

// export async function register(email, password, username) {
//     const existing = await api.get(`/users?email=${email}`);
//     if (existing.data.length> 0){
//         throw new Error("User already exist with this email");
//     }
    
//     const res = await api.post('/users', {email, password, username});

//     return res.data;
// }