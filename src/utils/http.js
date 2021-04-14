import axios from 'axios';

var instance = axios.create({
    baseURL: "",
    timeout: 20000,
});

export default instance;