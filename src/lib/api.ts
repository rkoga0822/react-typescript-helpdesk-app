import axios from "axios";

//laravelとのAPI通信用
export const api = axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL,
    headers:{
        "Content-Type":'application/json',
        Accept:'application/json',
    }
})