import axios from 'axios';

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_PROTOCOL}${process.env.REACT_APP_REMOTE_URL}:${process.env.REACT_APP_REMOTE_PORT}`
});

export default instance