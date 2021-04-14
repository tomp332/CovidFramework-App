import {Button, Form} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import React, {useState} from "react";

function ClientActions() {
    const [fileName, setFileName] = useState("Upload Boundary File");
    return <>
        <Form.Group controlId="command">
            <Form.Label className={"small-titles"} id={"title2"}>Command</Form.Label>
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
            <Form.File className={"small-titles"} id="upload-file" label="Choose file" />
        </Form.Group>
        <Form.Group controlId="sendCommand">
            <Button class="buttons" id={"send-button"} variant={"success"}>Send</Button>
        </Form.Group>
        <Form.Group controlId="response">
            <Form.Label className={"small-titles"} id={"title3"}>Response</Form.Label>
            <Form.Control as="textarea" rows={10} disabled={true} className={"response"}/>
        </Form.Group>
        <div className={"buttons"}>
            <NavLink to={"/clients"}>
                <Button href="/clients" variant={"success"}>Back</Button>
            </NavLink>
        </div>

    </>;
}

export default ClientActions;