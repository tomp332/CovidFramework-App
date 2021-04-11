import {Button, Spinner, Table} from 'react-bootstrap';
import React, {lazy, Suspense, useState} from 'react';
import {NavLink} from "react-router-dom";
import ClientControl from "./ClientControl";

const ClientsTable = ({data})=>{
    function KillClient(clientId){
        console.log(`Killing client: ${clientId}`);
    }

    return(
        <>
            <Table className={"clients-table"} striped hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>OS</th>
                    <th>Public IP</th>
                    <th>Admin</th>
                    <th>Status</th>
                    <th id={"action-column"}>Action</th>
                </tr>
                </thead>
                <tbody>
                    {data.map(data=>(
                        <tr key={`${data.client_id}`}>
                            <td>{data.client_id}</td>
                            <td>{data.username}</td>
                            <td>{data.os}</td>
                            <td>{data.public_ip}</td>
                            <td>{
                                !data.isAdmin ? "False" : "True"
                                }
                            </td>
                            <td>{
                                <div className={"status-column"}>
                                    {(!data.status) ? (<div style={{color:"white",background:"red"}}>Disconnected</div>) :
                                    (<div style={{color:"white",background:"#3CB371"}}>Connected</div>)}
                                </div>
                            }</td>
                            <td>{
                                <div className={"row-buttons"}>
                                    <div className={"send-command-button"}>
                                        <NavLink to={`/control/${data.client_id}`}>
                                            <Button size={"md"} variant={"primary"}>Command</Button>
                                        </NavLink>
                                    </div>
                                    <div className={"kill-command-button"}>
                                        <Button size={"md"} variant={"danger"} onClick={()=>{
                                            KillClient(data.client_id)
                                        }}>Kill</Button>
                                    </div>

                                </div>
                            }</td>
                        </tr>
                        )
                    )}
                </tbody>
            </Table>
        </>
        )

}

export default ClientsTable;