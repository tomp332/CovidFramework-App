import "./Register.css";
import React from 'react';
import Title from "react-titles/Title6";
import registerActions from "../Register/RegisterActions";
import validateRegisterInfo from "../Register/validateRegisterInfo";
import {ClassicSpinner} from "react-spinners-kit";
import {Link} from "react-router-dom";
import {Card} from "react-bootstrap";

const Register=()=>{
    const {handleChange, values, handleSubmit,errors,ifSubmited} =  registerActions(validateRegisterInfo);
    return(
        <div className="registerPageWrapper">
            <div className="title">
                <Title size="300" text1="REGISTER"  open={true} />
            </div>
            <Card className={"register-card"}>
                    <form className="register-form">
                        <div className="register-inputs">
                            <label>Enter username</label>
                            <input id="username" name='username' type="text" placeholder="Username" value={values.username} onChange={handleChange}/>
                            {errors.username && <p>{errors.username}</p>}
                            <label>Enter password</label>
                            <input id="password" name='password' type="password" placeholder="Password" value={values.password} onChange={handleChange}/>
                            {errors.password && <p>{errors.password}</p>}
                            <label>Retype password</label>
                            <input id="password2" name='password2' type="password" placeholder="Verify password" value={values.password2} onChange={handleChange}/>
                            {errors.password2 && <p>{errors.password2}</p>}
                            {ifSubmited && <ClassicSpinner color="#99d14a"/>}
                            <button id={"register-button"} type='submit' onClick={handleSubmit}>Register</button>
                        </div>

                    </form>
            </Card>
            <div className="additional-buttons">
                    <Link to="/">
                        <button type="button">
                            Back
                        </button>
                    </Link>
                    <Link to="/login">
                        <button type="button">
                            Login
                        </button>
                    </Link>
                </div>
        </div>
    );
}
export default Register;