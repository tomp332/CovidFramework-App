import "./Login.css";
import React from 'react';
import Title from "react-titles/Title6";
import loginActions from "./LoginActions";
import validate from './validateInfo';
import {Card} from 'react-bootstrap';
import { ClassicSpinner } from "react-spinners-kit";
import {Link} from "react-router-dom";
const Login = () =>{
    const {handleChange, values, handleSubmit,errors,ifSubmited} =  loginActions(validate);

    return(
        <div className="loginPageWrapper">
            <div className="title">
                <Title size={300} text1="LOGIN"  open={true} />
            </div>
            <Card className={"login-card"}>
                    <form className="login-form">
                        <div className="login-inputs">
                            <label>Username</label>
                            <input id="username" name='username' type="text" placeholder="Username" value={values.username} onChange={handleChange}/>
                            {errors.username && <p>{errors.username}</p>}
                            <label>Password</label>
                            <input id="password" name='password' type="password" placeholder="Password" value={values.password} onChange={handleChange}/>
                            {errors.password && <p>{errors.password}</p>}
                        </div>
                        <div className="submit-button">
                            <button type='submit' onClick={handleSubmit}>Login</button>
                        </div>
                        {errors.loginError && <p>{errors.loginError}</p>}
                    </form>
            </Card>
            <div className="additional-buttons">
                {ifSubmited && <ClassicSpinner color="#99d14a"/>}
                <Link to="/">
                    <button type="button">
                        Back
                    </button>
                </Link>
            </div>
        </div>
    );
}
export default Login;

