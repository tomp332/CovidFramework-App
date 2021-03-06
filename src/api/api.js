import axios from "axios";

export const logout = async() =>{
    const result = await axios({
        method:'get',
        url:'http://10.0.0.7:443/api/logout',
        withCredentials:true
    });

    return result.status === 200;
}

export const login = async(values)=> {
    const result = await axios({
        method:'post',
        url:'http://10.0.0.7:443/login',
        data: {
            username:values.username,
            password:values.password,
        },
        withCredentials:true
    });
    return result.status === 200;
}
