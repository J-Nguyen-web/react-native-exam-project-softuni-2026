import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
    baseURL: "https://react-native-api-3.onrender.com",
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        config.headers.Autorization = `Bearer ${token}`;
    }
    return config;
})

export default api;