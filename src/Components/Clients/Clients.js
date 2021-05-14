import "./Clients.css";
import React, {useEffect, useState} from 'react';
import Title from "react-titles/Title6";
import ClientsTable from "./ClientsTable";
import {Spinner} from "reactstrap";
import axios from "../../axios";


const Clients = () => {
    const [data, setData] = useState(null);

    function getClients() {
        axios({
            url: `/api/clients`,
            headers: {
                'x-access-token':localStorage.getItem('token')
            },
            method:'get'
        })
            .then(data => {
                setData(data.data)
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        getClients();
        let handle = setInterval(getClients, 2000);
        return () => {
            setData(null)
            clearInterval(handle);
        };
    }, []);

    return (
        <div className="clientsPageWrapper">
            <div className="title">
                <Title size={300} text1="CLIENTS" open={true}/>
            </div>
            {(data) ? (
                <div className={"clients-table"}>
                    <ClientsTable data={data}/>
                </div>
            ) : (
                <Spinner actions={"border"} color={"success"} type="grow"/>
            )}
        </div>
    );
};
export default Clients;