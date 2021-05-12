import axios from 'axios';

const instance = axios.create({
    headers: {
        'x-access-token':localStorage.getItem('token')
    },
    baseURL: `${process.env.REACT_APP_PROTOCOL}${process.env.REACT_APP_REMOTE_URL}:${process.env.REACT_APP_REMOTE_PORT}`
});

export default instance