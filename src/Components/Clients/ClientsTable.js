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
        return data.map(({client_id, username, lastActive, isConnected, isAdmin, public_ip}, i) => {
            return (
                <li className="item item-container  table-content">
                    <div className="attribute" data-name="#">{i + 1}</div>
                    <div className="attribute user-id" data-name="CLIENT ID">{client_id}</div>
                    {/* Enclose semantically similar attributes as a div hierarchy */}
                    <div className="attribute-container user-information">
                        <div className="attribute" data-name="USERNAME">{username}</div>
                        <div className="attribute" data-name="ADMIN">{isAdmin ? 'Yes' : 'No'}</div>
                    </div>
                    <div className="attribute user-ip" data-name="PUBLIC IP">{public_ip}</div>
                    <div className="attribute-container activity">
                        <div className="attribute" data-name="LAST ACTIVE">{lastActive}</div>
                        <div className={`attribute is-connected ${isConnected ? 'true' : ''}`}
                             data-name="CONNECTION STATUS">{isConnected ? 'Connected' : 'Disconnected'}</div>
                    </div>
                    <div className="attribute action-buttons">
                        <button className="command-button">
                            <NavLink to={`/control/${client_id}`} style={{textDecoration: 'none', color: 'white'}}>

                                Command
                            </NavLink>
                        </button>
                        <button className="kill-button" onClick={() => KillClient(client_id)}>Kill</button>
                    </div>
                </li>
            )
        })
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
            <ol className="collection collection-container">
                <TableHeader/>
                {data !== null && renderClientRows()}
            </ol>
        </>
    )

}

function TableHeader() {
    return (
        <li className="item item-container table-header">
            <div className="attribute" data-name="#">#</div>
            <div className="attribute user-id" data-name="client id">CLIENT ID</div>
            <div className="attribute-container user-information">
                <div className="attribute" data-name="username">USERNAME</div>
                <div className="attribute" data-name="admin">ADMIN</div>
            </div>
            <div className="attribute user-ip" data-name="ip">PUBLIC IP</div>
            <div className="attribute-container activity">
                <div className="attribute" data-name="last active">LAST ACTIVE</div>
                <div className="attribute" data-name="is connected">CONNECTION STATUS</div>
            </div>
            <div className="attribute">ACTIONS</div>
        </li>
    )
}

export default ClientsTable;