import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Home from '../Components/Home/Home';
import Clients from '../Components/Clients/Clients';
import Docs from "../Components/Docs/Docs";
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
                <Route exact path="/" component={Index}>
                    {isAuthenticated && <Redirect to="/home"/>}
                </Route>
                <Route exact path="/login" component={Login}/>
                <ProtectedRoute isAuthenticated={isAuthenticated} exact path="/home" component={Home}/>
                <ProtectedRoute isAuthenticated={isAuthenticated} exact path="/clients" component={Clients}/>
                <ProtectedRoute isAuthenticated={isAuthenticated} exact path="/map" component={Map}/>
                <ProtectedRoute isAuthenticated={isAuthenticated} exact path="/docs" component={Docs}/>
                <ProtectedRoute isAuthenticated={isAuthenticated} exact path="/control/:id"
                                component={ClientControl}/>
                <Route exact component={Index}/>
                {/*<ProtectedRoute isAuthenticated={isAuthenticated} path="/settings" component={Settings}/>*/}
            </Switch>
        </Page>
    );
}
export default ReactRouter;