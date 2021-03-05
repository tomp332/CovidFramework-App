import "./Clients.css";
import React from 'react';
import Title from "react-titles/Title6";
const Clients = () =>{
    return(
        <div className="clientsPageWrapper">
            <div className="title">
                <Title size="300" text1="CLIENTS"  open={true} />
            </div>
        </div>
    );
};
export default Clients;