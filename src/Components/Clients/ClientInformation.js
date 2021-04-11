import {Card, Col, Form, Row} from "react-bootstrap";
import React from "react";

function ClientInformation(props) {
    return(
        <>
            <label>Client information:</label>
            <Card className={"user-info-card"}>
                <Row>
                    <Col className={"property-name"}>Client ID:</Col>
                    <Col className={"property-value"}>{props.client.client_id}</Col>
                </Row>
                <Row>
                    <Col className={"property-name"}>Status:</Col>
                    {(props.client.status) ? (
                        <Col className={"client-status-connected"}>Connected</Col>
                    ) : (
                        <Col className={"client-status-disconnected"}>Disconnected</Col>)}
                </Row>
                <Row>
                    <Col className={"property-name"}>Username:</Col>
                    <Col className={"property-value"}>{props.client.username}</Col>
                </Row>
                <Row>
                    <Col className={"property-name"}>Location:</Col>
                    <Col className={"property-value"}>Unknown</Col>
                </Row>
                <Row>
                    <Col className={"property-name"}>Public IP:</Col>
                    <Col className={"property-value"}>{props.client.public_ip}</Col>
                </Row>
                <Row>
                    <Col className={"property-name"}>Administrator:</Col>
                    {(props.client.isAdmin) ? (
                        <Col className={"property-value"}>True</Col>
                    ) : (
                        <Col className={"property-value"}>False</Col>)}
                </Row>
                <Row>
                    <Col className={"property-name"}>Wifi enabled:</Col>
                    {(props.client.wifiEnabled) ? (
                        <Col className={"property-value"}>True</Col>
                    ) : (
                        <Col className={"property-value"}>False</Col>)}
                </Row>
                <Row>
                </Row>
            </Card>
        </>
    )


}
export default ClientInformation;