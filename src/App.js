import React, {useEffect, useState} from 'react';
import ReactRouter from "./Routes/AllRoutes";
import './App.css';
import UserContext from "./Components/User";
import cookies from 'react-cookies';
import axios from "axios";

let user = {
    username:null,
    isAuthenticated:false
};

function App() {
    const [userInfo, setUserInfo]= useState(user);
    function validateToken(){
        const token = cookies.load('session_id');
        if(token !== undefined){
            axios({
                method:'get',
                url:"http://10.0.0.4:443/auth",
                withCredentials:true
            }).then(() =>{
                user = {
                    username:cookies.load('session'),
                    isAuthenticated:true
                };
                setUserInfo(user);
            }).catch(function (error){
                    if(error.response) {
                        user = {
                            username:null,
                            isAuthenticated:false
                        };
                        setUserInfo(user);
                    }
                })
        }
    }

    useEffect(() => {
        validateToken();
        let handle = setInterval(validateToken,4000);
        return ()=> {clearInterval(handle);
        };
    },[]);

    return (
        <div className="wrapper">
            <UserContext.Provider value={{userInfo,setUserInfo}}>
                <ReactRouter />
            </UserContext.Provider>
        </div>
      );
}
export default App;
