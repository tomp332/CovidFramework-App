import {Modal} from 'react-bootstrap';
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

        }).catch(() => setKillStatus(false))
    }

    const renderClientRows = () => {
        return data.map(({ client_id, username, lastActive, isConnected, isAdmin }, i) => {
            return (
                <li className="item item-container  table-content">
                    <div className="attribute" data-name="#">{i + 1}</div>
                    <div className="attribute user-id" data-name="client id">{client_id}</div>
                    {/* Enclose semantically similar attributes as a div hierarchy */}
                    <div className="attribute-container user-information">
                        <div className="attribute" data-name="username">{username}</div>
                        <div className="attribute" data-name="admin">{isAdmin ? 'Yes': 'No'}</div>
                    </div>
                    <div className="attribute-container activity">
                        <div className="attribute" data-name="last active">{lastActive}</div>
                        <div className={`attribute is-connected ${isConnected ? 'true' : ''}`} data-name="is connected">{isConnected ? 'Yes': 'No'}</div>
                    </div>
                    <div className="attribute action-buttons">
                        <button className="command-button">
                            <NavLink to={`/control/${data.client_id}`} style={{ textDecoration: 'none' }}>
                                Command
                            </NavLink>
                        </button>
                        <button className="kill-button" onClick={() => KillClient(data.client_id)}>Kill</button>
                    </div>
             </li>
            )
        })
    }

    return (
        <div>
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
            <ol className="collection collection-container">
                <TableHeader/>
                {data !== null && renderClientRows()}
            </ol>
            {/* <Table className={"clients-table"} striped hover>
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
                                    {(!data.isConnected) ? (
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
            </Table> */}
        </div>
    )

}

function TableHeader() {
    return (
        <li className="item item-container">
            <div className="attribute" data-name="#">#</div>
            <div className="attribute user-id" data-name="client id">client id</div>
            {/* Enclose semantically similar attributes as a div hierarchy */}
            <div className="attribute-container user-information">
                <div className="attribute" data-name="username">Username</div>
                <div className="attribute" data-name="admin">Is Admin</div>
            </div>
            <div className="attribute-container activity">
                <div className="attribute" data-name="last active">Last Active</div>
                <div className="attribute" data-name="is connected">Is Connected</div>
            </div>
            <div className="attribute">Actions</div>
        </li>
    )
}

export default ClientsTable;