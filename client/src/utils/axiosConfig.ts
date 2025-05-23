import Axios from "axios"
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = Axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

export { api };
