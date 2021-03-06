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
                <Title size="300" text1="LOGIN"  open={true} />
            </div>
            <Card style={{ width: '20rem',height:'20rem',borderColor:"black"}}>
                <div className="login">
                    <Card style={{ width: '20rem',height:'20rem'}}>
                        <form className="login-form">
                            <div className="login-inputs">
                                <input id="username" name='username' type="text" placeholder="Username" value={values.username} onChange={handleChange}/>
                                {errors.username && <p>{errors.username}</p>}
                                <input id="password" name='password' type="password" placeholder="Password" value={values.password} onChange={handleChange}/>
                                {errors.password && <p>{errors.password}</p>}
                            </div>
                            <div className="submit-button">
                                <button type='submit' onClick={handleSubmit}>Login</button>
                                {ifSubmited && <ClassicSpinner color="#99d14a"/>}
                            </div>

                        </form>
                    </Card>

                </div>
                <div className="additional-buttons">
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
            </Card>
            </div>
    );
}
export default Login;

