import axios from 'axios';
let instance
if(process.env.NODE_ENV === 'development'){
     instance = axios.create({
        baseURL: `${process.env.REACT_APP_PROTOCOL}${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_REMOTE_PORT}`
    });
}
export default instance