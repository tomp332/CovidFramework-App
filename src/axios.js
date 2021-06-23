import axios from 'axios';
import {logUserOut} from "./redux/actions/userActions";
import {store} from './index'

let instance

if (process.env.NODE_ENV === 'development') {
    instance = axios.create({
        baseURL: `${process.env.REACT_APP_PROTOCOL}${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_REMOTE_PORT}`
    });
} else {
    instance = axios.create({});
}

instance.interceptors.response.use((response) => {
    return response
}, function (error) { // refresh JWT token needed
    if (error.response.status >= 401 || error.response.status === 403) {
        store.dispatch(logUserOut());
    }
})
export default instance