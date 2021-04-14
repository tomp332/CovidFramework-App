import {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import Title from "react-titles/Title6";
import React from "react";
import { Form} from 'react-bootstrap';
import './ClientControl.css';
import ClientInformation from "./ClientInformation";
import ClientActions from './ClientActions';
import {Spinner} from "reactstrap";


const ClientControl = () =>{
    const {id } = useParams();
    const [client, setClient]= useState(null);

    useEffect(() => {
        fetch('http://10.0.0.4:443/api/client',{method:'POST', headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({id:id}), credentials:"include"})
            .then(response=>response.json())
            .then(data=>setClient(data.user))
    }, [id]);
    return (
        <div className="controlPageWrapper">
            <div className="title">
                <Title size="600" text1="COMMAND & CONTROL" open={true}/>
            </div>
            <Form className={"command-form"}>
                {(client) ? (
                    <>
                        <ClientInformation client={client}/>
                        <ClientActions client={client}/>
                    </>
                    ) : <Spinner actions={"border"} color={"success"} type="grow"/>}
            </Form>
        </div>
    );
}

export default ClientControl;
