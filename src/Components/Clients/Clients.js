import "./Clients.css";
import React ,{useState,useEffect} from 'react';
import Title from "react-titles/Title6";
import ClientsTable from "./ClientsTable";
import {Spinner} from "reactstrap";


const Clients = () =>{
    const [data, setData] = useState(null);
    function getClients()
    {
        fetch('http://10.0.0.4:443/api/clients',{credentials:"include"})
            .then(response=>response.json())
            .then(data=>setData(data))
    }
    useEffect(() => {
        getClients();
        let handle = setInterval(getClients,2000);
        return ()=> {clearInterval(handle);
        };
    },[]);

    return(
        <div className="clientsPageWrapper">
            <div className="title">
                <Title size="300" text1="CLIENTS"  open={true} />
            </div>
            {(data) ? (
                <div className={"clients-table"}>
                    <ClientsTable data={data}/>
                </div>
            ):(
                <Spinner actions={"border"} color={"success"} type="grow"/>
            )}
        </div>
    );
};
export default Clients;