import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {Spinner} from "reactstrap";

function ProtectedRoute({component: Component, isAuthenticated, ...rest}) {
    return (
        <Route {...rest} render={(props) => {
            if (isAuthenticated === true) {
                return <Component {...props}/>
            } else if (isAuthenticated === false) {
                return (
                    <Redirect to='/'/>
                )
            } else if (isAuthenticated === null) {
                return <Spinner actions={"border"} color={"success"} type="grow"/>
            }
        }}
        />
    );
}

export default ProtectedRoute;