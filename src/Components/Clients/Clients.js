import "./Clients.css";
import React from 'react';
import Title from "react-titles/Title6";
import {Table} from 'react-bootstrap';
const Clients = () =>{
    return(
        <div className="clientsPageWrapper">
            <div className="title">
                <Title size="300" text1="CLIENTS"  open={true} />
            </div>
            <div className={"clients-table"}>
                <Table responsive={"lg"}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
};
export default Clients;