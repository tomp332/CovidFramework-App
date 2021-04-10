import "./Clients.css";
import React ,{useState,useEffect} from 'react';
import Title from "react-titles/Title6";
import ClientsTable from "./ClientsTable";



const Clients = () =>{
    const [data, setData] = useState([]);
    // Calling the function on component mount
    useEffect(() => {
        fetch('http://10.0.0.4:443/api/clients',{credentials:"include"})
            .then(response=>response.json())
            .then(data=>setData(data))
        setInterval(() => {
            fetch('http://10.0.0.4:443/api/clients',{credentials:"include"})
                .then(response=>response.json())
                .then(data=>setData(data))
        }, 2000);
    },[]);

    return(
        <div className="clientsPageWrapper">
            <div className="title">
                <Title size="300" text1="CLIENTS"  open={true} />
            </div>
            <div className={"clients-table"}>
                <ClientsTable data={data}/>
            </div>
        </div>
    );
};
export default Clients;