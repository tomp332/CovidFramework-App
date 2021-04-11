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
    }).catch(err => {console.log(err);return err});
    console.log(result);
    return result.status === 200;
}

export const register = (values)=> {
    const result = axios({
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

export const getClient = ()=> {
    fetch('http://10.0.0.4:443/api/clients',{credentials:"include"})
        .then(response=>response.json())
        .then(data=>data)
}