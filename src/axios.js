import axios from 'axios';



const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    // baseURL: "https://enthousiaste-saucisson-12296.herokuapp.com/",
    headers: {
        post: {
            Accept: 'application/json'
        },
        get: {
            Accept: 'application/json'
        }
    },
    withCredentials: true,
})

export default instance;