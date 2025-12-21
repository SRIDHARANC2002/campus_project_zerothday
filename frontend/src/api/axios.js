import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://campus-connect-backend-7ubg.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;
