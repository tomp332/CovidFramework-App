import "./Docs.css";
import React from 'react';
import Title from '../Title/Title'

const Docs = () => {
    return (
        <div className="docPageWrapper">
            <div className="title">
                <Title text1={"DOCS."} text2={'_'.repeat(100)} open={true}/>
            </div>
        </div>
    )
}

export default Docs;