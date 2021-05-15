import "./Clients.css";
import React, {useEffect, useState} from 'react';
import Title from "react-titles/Title6";
import ClientsTable from "./ClientsTable";
import {Spinner} from "reactstrap";
import {getClients} from "../../api/api";


const Clients = () => {
    const [data, setData] = useState(null);

    function getAllClients(){
        getClients().then((data) => setData(data));
    }

    useEffect(() => {
        getAllClients()
        let handle = setInterval(getAllClients, 2000);
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
            {(data !== null) ? (
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