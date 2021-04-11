import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import Title from "react-titles/Title6";
import React from "react";
import { Form, Card, Row, Col,Button} from 'react-bootstrap';
import './ClientControl.css';
import Clients from "./Clients";

const ClientControl = () =>{
    //need to fix loading waiting for client response
    const {id } = useParams();
    const [client, setClient]= useState({});
    useEffect(() => {
        fetch('http://10.0.0.4:443/api/client',{method:'POST', headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({id:id}), credentials:"include"})
            .then(response=>response.json())
            .then(data=>setClient(data.user))
    }, [id]);
    console.log(client);
    return (

        <div className="controlPageWrapper">
            <div className="title">
                <Title size="600" text1="COMMAND & CONTROL" open={true}/>
            </div>
            <Form className={"command-form"}>
                <label>Client information:</label>
                <Card className={"user-info-card"}>
                    <Row>
                        <Col className={"property-name"}>Client ID:</Col>
                        <Col className={"property-value"}>{id}</Col>
                    </Row>
                    <Row>
                        <Col className={"property-name"}>Status:</Col>
                        {(client.status)?(
                            <Col className={"client-status-connected"}>Connected</Col>
                        ):(
                            <Col className={"client-status-disconnected"}>Disconnected</Col>)}
                    </Row>
                    <Row>
                        <Col className={"property-name"}>Username:</Col>
                        <Col className={"property-value"}>{client.username}</Col>
                    </Row>
                    <Row>
                        <Col className={"property-name"}>Location:</Col>
                        <Col className={"property-value"}>Unknown</Col>
                    </Row>
                    <Row>
                        <Col className={"property-name"}>Public IP:</Col>
                        <Col className={"property-value"}>{client.public_ip}</Col>
                    </Row>
                    <Row>
                        <Col className={"property-name"}>Administrator:</Col>
                        {(client.isAdmin)?(
                            <Col className={"property-value"}>True</Col>
                        ):(
                        <Col className={"property-value"}>False</Col>)}
                    </Row>
                    <Row>
                        <Col className={"property-name"}>Wifi enabled:</Col>
                        {(client.wifiEnabled)?(
                            <Col className={"property-value"}>True</Col>
                        ):(
                            <Col className={"property-value"}>False</Col>)}
                    </Row>
                    <Row>
                    </Row>
                    {/*</Container>*/}
                </Card>
                <Form.Group controlId="command">
                    <Form.Label>Command</Form.Label>
                    <Form.Control as="select">
                        <option>Persistence</option>
                        <option>Elevate</option>
                        <option>Upload</option>
                        <option>Download</option>
                        <option>Change background</option>
                        <option>Screen capture</option>
                        <option>Get system information</option>
                        <option>Get network information</option>
                        <option>Get wifi passwords</option>
                        <option>Get stored chrome passwords</option>
                        <option>Prompt user for login UI</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="response">
                    <Form.Label>Response</Form.Label>
                    <Form.Control as="textarea" rows={10} disabled={true} className={"response"}/>
                </Form.Group>
                <Button href="/clients" variant={"success"}>Back</Button>
            </Form>
        </div>
    );
}

export default ClientControl;
