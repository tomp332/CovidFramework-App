import React, {useEffect, useState} from 'react';
import ReactRouter from "./Routes/AllRoutes";
import './App.css';
import UserContext from "./Components/User";
import axios from "./axios";


function App() {
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
        let  user = {
            username: null,
            isAuthenticated: false
        }
        if (localStorage.token) {
            user = {
                username: localStorage.getItem('username'),
                isAuthenticated: true
            }
        }
        setUserInfo(user)
    }, [])

    return (
        <div className="wrapper">
            <UserContext.Provider value={{userInfo, setUserInfo}}>
                <ReactRouter/>
            </UserContext.Provider>
        </div>
    );
}

export default App;
