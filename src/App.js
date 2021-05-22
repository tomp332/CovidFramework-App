import React, {useEffect, useState} from 'react';
import ReactRouter from "./Routes/AllRoutes";
import UserContext from "./Components/User";
import axios from "./axios";

import styled from '@emotion/styled'
import {css, keyframes} from '@emotion/react'

const App = () => {
    const [userInfo, setUserInfo] = useState({
        username: null,
        isAuthenticated: validateToken()
    });

    function validateToken(){
        return axios.get('/web/auth',{
            headers: {
                'x-access-token':localStorage.getItem('token')
            },
        }).then(()=>true).catch(()=>false)
    }

    useEffect(() => {
        let user = {}
        if (localStorage.token) {
            user = {
                username: localStorage.getItem('username'),
                isAuthenticated: true
            }
        }
        else{
            user = {
                username: null,
                isAuthenticated: false
            }
        }
        setUserInfo(user)
    }, [])

    return (
        <Wrapper className="wrapper">
            <UserContext.Provider value={{userInfo, setUserInfo}}>
                <ReactRouter/>
            </UserContext.Provider>
        </Wrapper>
    );
}

export default App;

const Wrapper = styled.div``
