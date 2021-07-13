import React, {useEffect, useState} from 'react';
import Title from "../Title/Title";
import ClientsTable from "./ClientsTable";
import {Spinner} from "reactstrap";
import {getClients} from "../../api/api";
import styled from '@emotion/styled'


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
        <Wrapper>
            <Title text1="CLIENTS" text2={'_'.repeat(100)} open={true}/>
            {(data !== null) ? (
                <ClientsTable data={data}/>
            ) : (
                <Spinner actions={"border"} color={"success"} type="grow"/>
            )}
        </Wrapper>
    );
};

export default Clients;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: stretch;
    width: 100%;
`