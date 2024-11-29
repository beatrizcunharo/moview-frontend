import axios from "axios"

const api = axios.create({
    baseURL: 'https://moview-back.onrender.com/api/'
})

export default api
