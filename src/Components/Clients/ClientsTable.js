import {Table,Button} from 'react-bootstrap';
import React from 'react';


const ClientsTable = ({data})=>{
    function SendCommandButton(){
        return (
            <Button size={"md"} variant={"primary"}>Send command</Button>
        );
    }

    function KillButton(){
        return (
            <Button size={"md"} variant={"danger"}>Kill client</Button>
        );
    }
    const columns = data[0] && Object.keys(data[0]);
    console.log(columns);
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
                        <tr>
                            <td>{data.client_id}</td>
                            <td>{data.username}</td>
                            <td>{data.os}</td>
                            <td>{data.public_ip}</td>
                            <td>{
                                !data.isAdmin ? "False" : "True"
                                }
                            </td>
                            <td>{
                                (!data.status) ? (<div style={{color:"white",background:"red"}}>Disconnected</div>) :
                                    (<div style={{color:"white",background:"#3CB371"}}>Connected</div>)
                            }</td>
                            <td>{
                                <div className={"row-buttons"}>
                                    <div className={"send-command-button"}>
                                        <SendCommandButton/>
                                    </div>
                                    <div className={"kill-command-button"}>
                                        <KillButton/>
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