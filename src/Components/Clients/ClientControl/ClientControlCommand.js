import {Form} from 'react-bootstrap';
import React, {useState} from "react";
import {sendCommand, uploadFile} from "../../../api/api";
import {Input} from "reactstrap";
import styled from "@emotion/styled";
import PowershellModal from "./PowershellModal";
import './ClientControl.css'

const ClientControlCommand = ({client, commands}) => {
    const [fileName, setFileName] = useState(null);
    const [additionalInput, setAdditionalInput] = useState(null)
    const [file, setFile] = useState(null)
    const [currentCommand, setCurrentCommand] = useState("stayhome");
    const [errors, setErrors] = useState(null);
    const [sendingCommand, setSendingCommand] = useState(false)
    const [defaultPaths, setDefaultPaths] = useState("Enter remote path")

    function validatePathInput(path) {
        if (path !== "" && path !== null) {
            let lastChar = path.slice(path.length - 1)
            if (lastChar !== '\\' && lastChar !== '/' && lastChar !== '')
                return true
        }
        return false
    }

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
                        await sendCommand(client.client_id, tempCommand);
                    } else
                        setErrors("Unable to upload file, please try again")
                } else if (currentCommand.includes('download')) {
                    if (validatePathInput(additionalInput)) {
                        tempCommand = currentCommand + " " + additionalInput
                        await sendCommand(client.client_id, tempCommand);
                    } else
                        setErrors("No file was specified");
                } else {
                    response = await sendCommand(client.client_id, currentCommand)
                    if (!response) {
                        setErrors("Unable to send command to server, please try again");
                    }
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
                formData.append("id", client.client_id)
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

    function onOpenConsole() {
        setSendingCommand('ps');
    }

    function onCloseConsole() {
        setSendingCommand(true);
    }

    const onSelectedPowershell = () => {
        console.log(sendingCommand)
        return (
            <>
                <PowershellModal clientId={client.client_id} onOpen={onOpenConsole} onClose={onCloseConsole}/>
            </>
        )
    }
    return (
        <div className="client-control-info-table-row client-command">
            <select disabled={!client.isConnected} className="client-control-command-select" onChange={(e) => {
                setCurrentCommand(e.target.value)
                if(e.target.value === 'StartPS')
                    setSendingCommand('ps')
                else
                    setSendingCommand(false)
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
                                <AutoCompleteButton id="auto-complete-button"
                                                    onClick={() => setDefaultPaths(`C:\\`)}>C:\</AutoCompleteButton>
                                <AutoCompleteButton id="auto-complete-button"
                                                    onClick={() => setDefaultPaths(`C:\\Users\\${client.username}\\Desktop`)}>Desktop</AutoCompleteButton>
                                <AutoCompleteButton id="auto-complete-button"
                                                    onClick={() => setDefaultPaths(`C:\\Users\\${client.username}\\Documents`)}>Documents</AutoCompleteButton>
                                <AutoCompleteButton id="auto-complete-button"
                                                    onClick={() => setDefaultPaths(`C:\\Users\\${client.username}\\Pictures`)}>Pictures</AutoCompleteButton>
                            </AutoCompleteDiv>
                            <Input value={defaultPaths} onChange={(e) => {
                                let replaceableString = String.raw`${e.target.value}`.replace(/\\/g, "\\\\");
                                setDefaultPaths(e.target.value)
                                setAdditionalInput(replaceableString)
                            }
                            } type="text"/>
                        </div> :
                        currentCommand === 'StartPS' ? (
                            <>
                                {onSelectedPowershell()}
                            </>
                        ) : null
            }
            <div className="client-control-command-buttons">
                <Errors>{errors}</Errors>
                {sendingCommand ? (
                    <SendButton id="auto-complete-button" disabled={true}
                                onClick={(e) => SendCommand(e)}>Sending..</SendButton>
                ) : sendingCommand === 'ps' ? (
                    <SendButton id="auto-complete-button" disabled={true}
                                onClick={(e) => SendCommand(e)}>Send</SendButton>
                ) : <SendButton id="auto-complete-button" disabled={!client.isConnected}
                                  onClick={(e) => SendCommand(e)}>Send</SendButton>}
            </div>
        </div>
    )
}

export default ClientControlCommand;

const Errors = styled.h6`
  color: red;
  margin: 0 auto;
`
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