import {Form} from 'react-bootstrap';
import React, {useState} from "react";
import {sendCommand, uploadFile} from "../../../api/api";
import styled from '@emotion/styled';
import {Input} from "reactstrap";


const ClientControlCommand = ({client, commands}) => {
    const [fileName, setFileName] = useState(null);
    const [additionalInput, setAdditionalInput] = useState(null)
    const [file, setFile] = useState(null)
    const [currentCommand, setCurrentCommand] = useState("stayhome");
    const [errors, setErrors] = useState(null);
    const [sendingCommand, setSendingCommand] = useState(false)
    const [defaultPaths, setDefaultPaths] = useState("Enter remote path")

    async function SendCommand(e) {
        e.preventDefault()
        setSendingCommand(true)
        setErrors(null);
        if (client.isConnected) {
            if (currentCommand === 'startPS') {
                //disable all other buttons and command select
            } else {
                let tempCommand = ""
                let response = ""
                if (currentCommand.includes('upload') || currentCommand.includes('change-image')) {
                    if (await UploadFile(e)) {
                        tempCommand = currentCommand + " " + fileName
                        response = await sendCommand(client.client_id, tempCommand);
                    } else
                        setErrors("Unable to upload file, please try again")
                } else if (currentCommand.includes('download')) {
                    tempCommand = currentCommand + " " + additionalInput
                    response = await sendCommand(client.client_id, tempCommand);
                } else
                    response = await sendCommand(client.client_id, currentCommand)
                if (!response) {
                    setErrors("Unable to send command to server, please try again");
                }
            }
            setSendingCommand(false)
        }
    }

    async function UploadFile(e) {
        e.preventDefault()
        if (fileName !== null) {
            setErrors(null);
            if (client.isConnected) {
                const formData = new FormData();
                formData.append("name", fileName);
                formData.append("file", file);
                formData.append("id",client.client_id)
                let response = await uploadFile(formData);
                if (!response) {
                    setErrors("Unable to upload file, please try again");
                    return false
                }
                return true
            }
        } else {
            setErrors("No file was chosen");
            return false
        }

    }

    const renderCommandOptions = () => {
        return Object.entries(commands).map(([command, displayCommand]) => {
            return (
                <>
                    <option onChange={() => {
                        setCurrentCommand(command)
                    }} value={command} key={command}>{displayCommand}</option>
                </>
            )
        })
    }


    return (
        <div className="client-control-info-table-row client-command">
            <select disabled={!client.isConnected} className="client-control-command-select" onChange={(e) => {
                setCurrentCommand(e.target.value)
            }}>
                <option disabled defaultValue={"stayhome"}>Select Command</option>
                {commands && renderCommandOptions()}
            </select>
            {
                currentCommand === 'upload' || currentCommand === 'change-image' ?
                    <div className="upload-file-wrapper">
                        <div className="btsrp-form-wrapper">
                            <Form.File className={"small-titles"} id="upload-file" label="Choose file"
                                       onChange={(e) => {
                                           setFileName(e.target.files[0].name.trim())
                                           setFile(e.target.files[0])
                                       }}/>
                        </div>
                    </div> :
                    currentCommand === 'download' ?
                        <div className="download-file-wrapper">
                            <Form.Label>Remote path:</Form.Label>
                            <AutoCompleteDiv>
                                <SmallLabel>One backslash between directories only</SmallLabel>
                                <AutoCompleteButton onClick={() => setDefaultPaths(`C:\\`)}>C:\</AutoCompleteButton>
                                <AutoCompleteButton
                                    onClick={() => setDefaultPaths(`C:\\Users\\${client.username}\\Desktop`)}>Desktop</AutoCompleteButton>
                                <AutoCompleteButton
                                    onClick={() => setDefaultPaths(`C:\\Users\\${client.username}\\Documents`)}>Documents</AutoCompleteButton>
                                <AutoCompleteButton onClick={() => setDefaultPaths(`C:\\Users\\${client.username}\\Pictures`)}>Pictures</AutoCompleteButton>
                            </AutoCompleteDiv>
                            <Input value={defaultPaths} onChange={(e) => {
                                let replaceableString = String.raw`${e.target.value}`.replace(/\\/g, "\\\\");
                                setDefaultPaths(e.target.value)
                                setAdditionalInput(replaceableString)
                            }} type="text"/>
                        </div> : null
            }
            <div className="client-control-command-buttons">
                <h6 style={{"color": "red"}}>{errors}</h6>
                {sendingCommand ? (
                    <SendButton disabled={true}
                            onClick={(e) => SendCommand(e)}>Sending..</SendButton>

                ) : (
                    <SendButton disabled={!client.isConnected}
                            onClick={(e) => SendCommand(e)}>Send</SendButton>
                )}
            </div>
        </div>
    )
}

export default ClientControlCommand;

const SendButton = styled.button`
  padding: 0.5em;
  min-width: 8em;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: #fff;
  font-weight: 600;
  background-color: #98d14a;
`
const SmallLabel = styled.p`
  color: #adadad;
  font-size: 0.8em;
  margin-left: 5px;
`
const AutoCompleteButton = styled.button`
  padding: 0.2em;
  margin-left: 5px;
  min-width: 2em;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: #fff;
  font-weight: 600;
  background-color: #98d14a;
`
const AutoCompleteDiv = styled.div`
  padding-bottom: 0.5vh;
`