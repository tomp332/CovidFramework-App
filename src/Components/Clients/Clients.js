import "./Clients.css";
import React, {useEffect, useState} from 'react';
import Title from "../Title/Title";
import ClientsTable from "./ClientsTable";
import {Spinner} from "reactstrap";
import {getClients} from "../../api/api";
import ClientCard from './ClientCard'


const Clients = () => {
    const [data, setData] = useState(null);

    function getAllClients() {
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
            <Title text1="CLIENTS" open={true}/>
            {/* {(data !== null) ? (
                <div className={"clients-table"}>
                    <ClientsTable data={data}/>
                </div>
            ) : (
                <Spinner actions={"border"} color={"success"} type="grow"/>
            )} */}
            {(data !== null && <ClientCard data={data[0]}/>) || <Spinner actions={"border"} color={"success"} type="grow"/>}
        </div>
    );
};
export default Clients;