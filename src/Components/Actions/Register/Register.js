import "./Register.css";
import React from 'react';
import Title from "react-titles/Title6";
const Register = () =>{
    return(
        <div className="registerPageWrapper">
            <div className="title">
                <Title size="400" text1="REGISTER"  open={true} />
            </div>

        </div>
    );
};
export default Register;