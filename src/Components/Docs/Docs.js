import "./Docs.css";
import React from 'react';
import Title from "react-titles/Title6";

const Docs = () => {
    return (
        <div className="docPageWrapper">
            <div className="title">
                <Title size={300} text1="DOCS." open={true}/>
            </div>
        </div>
    )
}
export default Docs;