import "./Login.css";
import React from 'react';
import Title from "react-titles/Title6";
import {Link} from "react-router-dom";
import loginActions from "./LoginActions";
import validate from './validateInfo';
import { ClassicSpinner } from "react-spinners-kit";

const Login = () =>{
    const {handleChange, values, handleSubmit,errors,ifSubmited} =  loginActions(validate);

    return(
        <div className="loginPageWrapper">
            <div className="title">
                <Title size="300" text1="LOGIN"  open={true} />
            </div>
            <div className="login">
                <form className="login-form">
                    <div className="login-inputs">
                        <p><input name='username' type="text" placeholder="Username" value={values.username} onChange={handleChange}/></p>
                        {errors.username && <p>{errors.username}</p>}
                        <p><input name='password' type="password" placeholder="Password" value={values.password} onChange={handleChange}/></p>
                        {errors.password && <p>{errors.password}</p>}
                    LoginActions</div>
                    <div className="login-buttons">
                        <button type='submit' onClick={handleSubmit}>Login</button>
                        {ifSubmited && <ClassicSpinner color="#99d14a"/>}
                    </div>
                </form>
            </div>
            <div className="buttons-login">
                <Link to="/">
                    <button type="button">
                        Back
                    </button>
                </Link>
                <Link to="/register">
                    <button type="button">
                        Register
                    </button>
                </Link>
            </div>
        </div>
        );
}
export default Login;

