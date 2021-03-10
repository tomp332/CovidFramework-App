import "./Index.css";
import React from 'react';
import Title from "react-titles/Title6";
import {Link} from "react-router-dom";


const Index = () =>{
    return(
        <div className="pageWrapper">
            <Title size="800" text1="THE COVID" text2="FRAMEWORK" open={true} />
            <div className="index-buttons">
                <Link to="/login">
                    <button type="button">
                        Login
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Index;