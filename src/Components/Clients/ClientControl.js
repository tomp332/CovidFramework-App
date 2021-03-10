import { useParams } from "react-router-dom";
import Title from "react-titles/Title6";
import React from "react";
import {Container, Form, Card, Row, Col} from 'react-bootstrap';
import './ClientControl.css';

const ClientControl = () =>{
    const { id } = useParams();
    return(
        <div className="controlPageWrapper">
            <div className="title">
                <Title size="600" text1="COMMAND & CONTROL"  open={true} />
            </div>
            <Form className={"command-form"}>
                    <label>Client information:</label>
                    <Card className={"user-info-card"}>
                        {/*<Container className={"user-info-container"}>*/}
                            <Row>
                                <Col className={"property-name"}>Client ID:</Col>
                                <Col className={"property-value"}>{id}</Col>
                            </Row>
                            <Row>
                                <Col className={"property-name"}>Username:</Col>
                                <Col className={"property-value"}>Test</Col>
                            </Row>
                            <Row>
                                <Col className={"property-name"}>Administrator:</Col>
                                <Col className={"property-value"}>False</Col>
                            </Row>
                            <Row>
                                <Col className={"property-name"}>Location:</Col>
                                <Col className={"property-value"}>USA</Col>
                            </Row>
                            <Row>
                                <Col className={"property-name"}>Public IP:</Col>
                                <Col className={"property-value"}>False</Col>
                            </Row>
                            <Row>
                                <Col className={"property-name"}>Wifi enabled:</Col>
                                <Col className={"property-value"}>False</Col>
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
                <Form.Group controlId="response" >
                    <Form.Label>Response</Form.Label>
                    <Form.Control as="textarea" rows={10} disabled={true} className={"response"}/>
                </Form.Group>
            </Form>
        </div>

    )
}

export default ClientControl;
