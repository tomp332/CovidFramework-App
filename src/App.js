import React, {useState} from 'react';
import ReactRouter from "./Routes/AllRoutes";
import './App.css';
import UserContext from "./Components/User";
import cookies from 'react-cookies';

let user = {
    username:null,
    isAuthenticated:false
};

function App() {
    const token = cookies.load('session_id');
    const username = cookies.load('session');
    if(token !== null){
        user = {
            username:username,
            isAuthenticated:true
        };
    }

    const [userInfo, setUserInfo]= useState(user);
    return (
        <div className="wrapper">
            <UserContext.Provider value={{userInfo,setUserInfo}}>
                <ReactRouter />
            </UserContext.Provider>
        </div>
      );
}
export default App;
