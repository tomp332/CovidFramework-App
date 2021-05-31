import React, {useEffect} from 'react';
import ReactRouter from "./Routes/AllRoutes";
import UserContext from "./Components/User";
import './App.css';
import axios from "./axios";
import {autoSignIn} from "./redux/actions/userActions";
import {createSelector} from "reselect";
import {makeSelectUser} from "./redux/selectors/userSelector";
import {useDispatch, useSelector} from "react-redux";

const stateSelector = createSelector(makeSelectUser, (user) => ({
    user
}))
const autoSignInDispatcher = (dispatch) => ({autoSignIn: (user) => dispatch(autoSignIn(user))})

function App() {
    const {autoSignIn} = autoSignInDispatcher(useDispatch())
    const {user} = useSelector(stateSelector)

    function validateToken() {
        return axios.get('/web/auth', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
        }).then(() => true).catch(() => false)
    }

    useEffect(() => {
        validateToken()
        if (localStorage.token) {
            autoSignIn(user)
        }
    }, [])
    return (
        <div className="wrapper">
            <ReactRouter/>
        </div>
    );
}

export default App;

const Wrapper = styled.div``
