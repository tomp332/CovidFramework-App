import React, {useContext} from 'react';
import {Redirect, Route, Switch} from 'react-router';
import Sidebar from '../Components/Sidebar/Sidebar';
import Home from '../Components/Home/Home';
import Clients from '../Components/Clients/Clients';
import Docs from "../Components/Docs/Docs";
import Settings from "../Components/Actions/Settings/Settings";
import GoogleMap from '../Components/GoogleMap/Map';
import './AllRoutes.css';
import Login from "../Components/Actions/Login/Login";
import Index from "../Components/Index/Index";
import Register from "../Components/Actions/Register/Register";
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute";
import UserContext from '../Components/User';



const ReactRouter = () => {

    const {userInfo,setUserInfo} = useContext(UserContext);

    return (
        <div className="main">
                <Sidebar/>
                <Switch>
                    <Route path="/" exact component={Index}/>
                    {/*{userInfo.isAuthenticated && <Redirect to="/home"/>}*/}
                    <Route path="/register" component={Register}/>
                    <Route path="/login" component={Login}/>
                    {/*{userInfo.isAuthenticated && <Redirect to="/home"/>}*/}
                    <ProtectedRoute isAuthenticated={userInfo.isAuthenticated} path="/home" component={Home}/>
                    <ProtectedRoute isAuthenticated={userInfo.isAuthenticated} path="/clients" component={Clients}/>
                    <ProtectedRoute isAuthenticated={userInfo.isAuthenticated} path="/map" component={GoogleMap}/>
                    <ProtectedRoute isAuthenticated={userInfo.isAuthenticated} path="/docs" component={Docs}/>
                    <ProtectedRoute isAuthenticated={userInfo.isAuthenticated} path="/settings" component={Settings}/>
                    {/*<Route path="/home" component={Home}/>*/}
                    {/*<Route path="/clients" component={Clients}/>*/}
                    {/*<Route path="/map" component={GoogleMap}/>*/}
                    {/*<Route path="/docs" component={Docs}/>*/}
                    {/*<Route path="/settings" component={Settings}/>*/}
                </Switch>
        </div>
    );
}
export default ReactRouter;