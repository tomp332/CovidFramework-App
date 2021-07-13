import {Button, Form, Modal} from "react-bootstrap";
import {Input} from "reactstrap";
import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {sendCommand, sendPSCommand} from "../../../api/api";
import axios from "../../../axios";


const PowershellModal = (props) => {
    const [show, setShow] = useState(false);
    const [allResponses, setAllResponses] = useState([]);
    const [currentCommand, setCurrentCommand] = useState(null)

    const handleClose = (e) => {
        setShow(false)
        props.onClose(e.target.value);
        setAllResponses([])
    }

    const handleShow = () => {setShow(true);}

    function handleOpenConsole(event) {
        props.onOpen(event.target.value);
    }

    const getResponse = () => {
        axios({
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": localStorage.getItem('token')
            },
            url: `/api/response/ps/${props.clientId}`,
            method: 'get',
        })
            .then(data => {
                if (Object.keys(data.data).length !== 0) {
                    setAllResponses(oldArray => [...oldArray, data.data.response]);
                }
            })
            .catch(e => console.log(e.message))
    }

    useEffect(() => {
        let handle = setInterval(getResponse, 2000);
        if(!show)
            return () => {
                clearInterval(handle);
            };
        return () => {
            clearInterval(handle);
        };
    },[show])


    function firstCommandWrapper(e) {
        sendCommand(props.clientId, "StartPS").then(r => r).catch(e => console.log(e.message))
        handleOpenConsole(e)
        handleShow()
    }

    function closeWrapper(e) {
        sendPSCommand(props.clientId, "exit").then(r => r).catch(e => console.log(e.message))
        handleClose(e)
    }

    async function sendCommandWrapper() {
        await sendPSCommand(props.clientId, currentCommand).then().catch((err) =>
            setAllResponses(oldArray => [...oldArray, `\n[-] Error in console ${err.message}`]))
    }

    return (
        <>
            <LaunchPowershellButton id="auto-complete-button" onClick={e=>firstCommandWrapper(e)}>
                Launch Interactive Session
            </LaunchPowershellButton>
            <Modal backdrop={'static'} size={"xl"} show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Powershell Console</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input defaultValue={"Command"} onChange={e => {
                        e.preventDefault()
                        setCurrentCommand(e.target.value)
                    }}/>
                    <Form.Control disabled as="textarea" rows={10} value={allResponses}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={e=>closeWrapper(e)}>
                        Close
                    </Button>
                    <SendCommandButton variant="primary" onClick={sendCommandWrapper}>
                        Send
                    </SendCommandButton>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default PowershellModal;

const LaunchPowershellButton = styled.button`
  padding: 0.2em;
  min-width: 2em;
  margin: 0 auto;
  width: 12em;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: #fff;
  font-weight: 600;
  background-color: #98d14a;
`

const SendCommandButton = styled(Button)`
  background-color: #98d14a;
  filter:brightness(0.95);
  border-color:#98d14a;
  &:hover{
    filter:brightness(1);
    background-color: #98d14a;
    border-color:#98d14a;
  }
`
