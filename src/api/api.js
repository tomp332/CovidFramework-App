import axios from "../axios";
// const defaultAxios = require('axios')

export const logout = async () => {
    const result = await axios({
        method: 'get',
        url: '/api/logout',
        timeout: 100
    });
    return result.status === 200;
}

export const login = async (values) => {
    return await axios({
        method: 'post',
        url: '/web/login',
        data: {
            username: values.username,
            password: values.password,
        }
    }).then((token) => {
        return token.data
    }).catch(() => null);
}

export const register = async (values) => {
    const result = await axios({
        method: 'post',
        url: '/web/register',
        data: {
            username: values.username,
            password: values.password,
        }
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
        }
    });
    return result.status === 200;
}

export const uploadFile = async (formData, clientId) => {
    const result = await axios.post("/api/commands/upload", formData, {
        headers: {
            "client_id": clientId,
            "Content-Type": "multipart/form-data",
        },
    }).then().catch(err => err);
    return result.status === 200;
}

export const killClient = async (clientId) => {
    const result = await axios({
        method: 'post',
        url: "/api/clients/kill",
        data: {
            client_id: clientId,
        }
    });
    return result.status === 200;
}

export const checkToken = async () => {
    const result = await axios({
        method: 'get',
        url: "/web/auth"
    });
    return result.status === 200;
}

export const getStatistics = async () => {
    const statistics = await axios({
        method: 'get',
        url: "/api/clients/statistics"
    })
    return statistics
}