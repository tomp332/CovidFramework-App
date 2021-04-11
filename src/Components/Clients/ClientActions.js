import {Button, Form} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import React from "react";

function ClientActions() {
    return <>
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
        <NavLink to={"/clients"}>
            <Button href="/clients" variant={"success"}>Back</Button>
        </NavLink>
    </>;
}

export default ClientActions;