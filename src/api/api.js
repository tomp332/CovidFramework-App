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


function fetchUser() {
    console.log('fetching user data')
    return fetch('http://10.0.0.7:443/api/user',{credentials:"include"})
        .then(response=>response.json())
        .then(response=> {return response})
}

export function fetchUserData() {
    let userPromise = fetchUser()
    return {
        user: wrapPromise(userPromise)
    }
}

function wrapPromise(promise){
    let status = 'pending';
    let result;
    let suspender = promise.then(
        r=>{
            status = "success";
            result = r;
        },
        e=>{
            status = "error";
            result = e;
        }
    );
    return {
        read(){
            if(status === "pending") {
                throw suspender;
            }else if(status ==="error"){
                throw result;
            }else if(status === "success"){
                return result;
            }
        }
    };
}
