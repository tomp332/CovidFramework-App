import {Button, Modal, Table} from 'react-bootstrap';
import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {killClient} from "../../api/api";
import "./ClientsTable.css";

const ClientsTable = ({data}) => {
    const [killStatus, setKillStatus] = useState(false);
    const [alertShow, setAlertShow] = useState(false);
    const [currentKilledClient, setCurrentKilledClient] = useState(null);

    function KillClient(clientId) {
        setKillStatus(false);
        killClient(clientId).then(response => {
            if (response) {
                setKillStatus(true);
                setCurrentKilledClient(clientId);
            } else {
                setKillStatus(false);
            }
            setAlertShow(true);

        });
    }

    return (
        <>
            <Modal
                size="sm"
                show={alertShow}
                onHide={() => setAlertShow(false)}
                aria-labelledby="kill-client-alert"
            >
                {(killStatus) ? (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Success
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Kill command for client {currentKilledClient} was successful</Modal.Body>
                    </>
                ) : (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Error
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Kill command for client {currentKilledClient} failed, please try again</Modal.Body>
                    </>
                )}
            </Modal>
            <Table className={"clients-table"} striped hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Last active</th>
                    <th>OS</th>
                    <th>Public IP</th>
                    <th>Admin</th>
                    <th>Status</th>
                    <th id={"action-column"}>Action</th>
                </tr>
                </thead>
                <tbody>
                {data.map(data => (
                        <tr key={`${data.client_id}`}>
                            <td>{data.client_id}</td>
                            <td>{data.username}</td>
                            <td>{data.lastActive}</td>
                            <td>{data.os}</td>
                            <td>{data.public_ip}</td>
                            <td>{
                                !data.isAdmin ? "False" : "True"
                            }
                            </td>
                            <td>{
                                <div className={"status-column"}>
                                    {(!data.status) ? (
                                            <div style={{color: "white", background: "red"}}>Disconnected</div>) :
                                        (<div style={{color: "white", background: "#3CB371"}}>Connected</div>)}
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
                                        <Button size={"md"} variant={"danger"} onClick={() => {
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