import {useState, useEffect} from 'react';
import {NavLink, useParams} from "react-router-dom";
import Title from "react-titles/Title6";
import React from "react";
import {Button, Form} from 'react-bootstrap';
import './ClientControl.css';
import ClientInformation from "./ClientInformation";
import ClientActions from './ClientActions';
import {Spinner} from "reactstrap";
import {forEach} from "react-bootstrap/ElementChildren";


const ClientControl = () => {
    const {id} = useParams();
    const [client, setClient] = useState(null);
    const [clientStatus, setClientStatus] = useState(true);
    const [clientResponse, setClientResponse] = useState();
    const [allResponses, setAllResponses] = useState([]);
    // const [responseString, setResponseString] = useState("");
    let responseString = "";


    useEffect(()=>{
        const getClient = () =>{
            fetch('http://10.0.0.4:443/api/client', {
                method: 'POST', headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id: id}), credentials: "include"
            })
                .then(response => response.json())
                .then(data => {
                    setClient(data.user);
                    setClientStatus(data.user.status);
                });
            const getResponse = () => {
                fetch('http://10.0.0.4:443/api/response',{method:'POST', headers:{'Content-Type': 'application/json'},
                    body:JSON.stringify({id:id}), credentials:"include"})
                    .then(response=>response.json())
                    .then(data=>{
                        if(Object.keys(data).length !== 0){
                            setClientResponse(data.response);
                            setAllResponses(oldArray =>[...oldArray,data.response]);
                        }
                    });
            }
            getResponse();
        }
        getClient();
        let handle = setInterval(getClient,5000);
        return ()=> {clearInterval(handle);
        };
    },[]);

    function displayResponse()
    {
        allResponses.forEach( resp =>{
            responseString += `\n*************************** New response ***************************\n${resp}\n_______________________________________________________________________\n`;
        });
        return(
            <Form.Control as="textarea" rows={10} disabled={true} className={"response"}
                value={(clientResponse) && `${responseString}`}
            />
        )
    }

    return (
        <div className="controlPageWrapper">
            <div className="title">
                <Title size="600" text1="COMMAND & CONTROL" open={true}/>
            </div>
            <Form className={"command-form"}>
                {(client) ? (
                    <>
                        <ClientInformation client={client}/>
                        <ClientActions client={client}/>
                        <Form.Group controlId="response">
                            <Form.Label className={"small-titles"} id={"title3"}>Response</Form.Label>
                            {displayResponse()}
                        </Form.Group>
                        <div className={"buttons"}>
                            <NavLink to={"/clients"}>
                                <Button href="/clients" variant={"success"}>Back</Button>
                            </NavLink>
                        </div>
                    </>
                    ) : <Spinner actions={"border"} color={"success"} type="grow"/>}
            </Form>
        </div>
    );
}

export default ClientControl;
