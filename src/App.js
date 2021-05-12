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
        }).then((res)=>{
            console.log(res)
            return true
        }).catch(()=>false)
    }

    useEffect(() => {
        let user = {}
        if (validateToken) {
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
        <div className="wrapper">
            <UserContext.Provider value={{userInfo, setUserInfo}}>
                <ReactRouter/>
            </UserContext.Provider>
        </div>
    );
}

export default App;
