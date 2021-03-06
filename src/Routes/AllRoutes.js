import React, {useContext} from 'react';
import {Route, Switch} from 'react-router';
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

    const {userInfo} = useContext(UserContext);
    return (
        <div className="main">
                <Sidebar/>
                <Switch>
                    <Route path="/" exact component={Index}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" component={Login}/>
                    <ProtectedRoute isAuthenticated={userInfo.isAuthenticated} path="/home" component={Home}/>
                    <ProtectedRoute isAuthenticated={userInfo.isAuthenticated} path="/clients" component={Clients}/>
                    <ProtectedRoute isAuthenticated={userInfo.isAuthenticated} path="/map" component={GoogleMap}/>
                    <ProtectedRoute isAuthenticated={userInfo.isAuthenticated} path="/docs" component={Docs}/>
                    <ProtectedRoute isAuthenticated={userInfo.isAuthenticated} path="/settings" component={Settings}/>
                </Switch>
        </div>
    );
}
export default ReactRouter;