import Cookies from 'js-cookie';

export const logout = async() =>{
    const response = await fetch('http://10.0.0.7:443/session/logout')
        .then(response=>response);
    return response.status === 200;
}

export const login = async (values)=>{
    const requestOptions = {
        method: 'POST',
        credentials: "omit",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
    };
    const response = await fetch('http://10.0.0.7:443/login',requestOptions)
        .then(response => response);
    // console.log(Cookie.);
    return response.status === 200;
}


