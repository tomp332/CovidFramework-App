import React from 'react';
import {Redirect, Route, Switch} from 'react-router';
import Home from '../Components/Home/Home';
import Clients from '../Components/Clients/Clients';
import Docs from "../Components/Docs/Docs";
import Settings from "../Components/Actions/Settings/Settings";
import Map from '../Components/GoogleMap/Map';
import './AllRoutes.css';
import Login from "../Components/Actions/Login/Login";
import Index from "../Components/Views/Index/Index";
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute";
import ClientControl from "../Components/Clients/ClientControl/ClientControl";
import Page from '../Components/Layouts/Page'
import {createSelector} from "reselect";
import {makeSelectAuthenticated} from "../redux/selectors/userSelector";
import {useSelector} from "react-redux";

const stateSelector = createSelector(makeSelectAuthenticated, (isAuthenticated) => ({
    isAuthenticated
}))

const ReactRouter = () => {
    const {isAuthenticated} = useSelector(stateSelector)
    return (
        <Page>
            <Switch>
                <Route path="/" exact component={Index}>
                    {isAuthenticated && <Redirect to="/home" />}
                </Route>
                <Route path="/login" component={Login}/>
                <ProtectedRoute isAuthenticated={isAuthenticated} path="/home" component={Home}/>
                <ProtectedRoute isAuthenticated={isAuthenticated} path="/clients" component={Clients}/>
                <ProtectedRoute isAuthenticated={isAuthenticated} path="/control/:id" component={ClientControl}/>
                <ProtectedRoute isAuthenticated={isAuthenticated} path="/map" component={Map}/>
                <ProtectedRoute isAuthenticated={isAuthenticated} path="/docs" component={Docs}/>
                <Route component={Index}/>
                {/*<ProtectedRoute isAuthenticated={isAuthenticated} path="/settings" component={Settings}/>*/}
            </Switch>
        </Page>
    );
}
export default ReactRouter;