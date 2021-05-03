
import {Form} from 'react-bootstrap';
import React, {useState} from "react";
import {sendCommand, uploadFile} from "../../../api/api";



const ClientControlCommand = ({ client, commands }) => {
    const [fileName, setFileName] = useState(null);
    const [file, setFile] = useState(null)
    const [currentCommand, setCurrentCommand] = useState("stayhome");
    const [errors, setErrors] = useState(null);

    async function SendCommand(e)
    {
        e.preventDefault()
        setErrors(null);
        //need a global state of the client is connected? and only then allow sending the command
        if(client.status)
        {
            if(currentCommand === 'startPS') {
                //disable all other buttons and command select
            }
            else{
                let response = await sendCommand(client.client_id, currentCommand);
                if(!response) {
                    setErrors("Unable to send command to server, please try again");
                }
            }
        }
    }

    async function UploadFile(e)
    {
        e.preventDefault()
        if(fileName !== null){
            setErrors(null);
            if(client.status)
            {
                const formData = new FormData();
                formData.append("name",fileName);
                formData.append("file", file);
                let response = await uploadFile(formData, client.client_id);
                if(!response) {
                    setErrors("Unable to upload file, please try again");
                }
            }
        }
        else
            setErrors("No file was chosen");
    }

    const renderCommandOptions = () => {
        return Object.entries(commands).map(([command, displayCommand]) => {
            return (
                <>
                    <option onChange={() => {setCurrentCommand(command)}} value={command} key={command}>{displayCommand}</option>
                </>
            )
        })
    }



    return (
        <div className="client-control-info-table-row client-command">
            <select className="client-control-command-select" onChange={(e) => setCurrentCommand(e.target.value)}>
                <option disabled defaultValue={"stayhome"}>Select Command</option>
                {commands && renderCommandOptions()}
            </select>
            {
                currentCommand === 'upload' || currentCommand === 'change-image' ?
                    <div className="upload-file-wrapper">
                        <div className="btsrp-form-wrapper">
                            <Form.File className={"small-titles"} id="upload-file" label="Choose file"
                                       onChange={(e) => {
                                           setFileName(e.target.files[0].name)
                                           setFile(e.target.files[0])
                                       }}/>
                        </div>
                        <div className="client-control-command-buttons">
                            <button className="command-button" onClick={(e) => UploadFile(e) }>
                                Upload
                            </button>
                        </div>
                    </div> :
                    currentCommand === 'download' ?
                        <div className="download-file-wrapper">
                            <Form.Label>Remote path:</Form.Label>
                            <Form.Control type="text" placeholder="Enter path"/>
                        </div> : null
            }
            <div className="client-control-command-buttons">
                <button className="command-button" onClick={(e)=>SendCommand(e)}>Send</button>
            </div>
        </div>
    )
}

export default ClientControlCommand;