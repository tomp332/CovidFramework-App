import {NavLink} from "react-router-dom";
import styled from "@emotion/styled";

const responseBanner = (responseObject) => {
    return (
        `\n[>>] New response: ${responseObject.date}  [<<]\n` +
        `\r${responseObject.response}` +
        "\r[>>] ___________________________________________________________ [<<]\n"
    )
}

const ClientControlResponse = ({clientResponse, allResponses}) => {

    let responseString = '';
    const displayResponse = () => {
        allResponses.forEach(resp => {
            responseString += responseBanner(resp)
        });
        return (clientResponse && responseString)
    }

    return (
        <div className="client-control-info-table">
            <div className="client-control-info-table-row client-response">
                <textarea
                    value={displayResponse()}
                    rows="10"
                    disabled
                    className="client-control-response-textarea response"
                />
                <div className="client-control-command-buttons">
                    <NavLink to={"/clients"}>
                        <BackButton
                            href="/clients"
                            variant={"success"}
                        >
                            Back
                        </BackButton>
                    </NavLink>
                    <ClearButton >Clear</ClearButton>
                </div>
            </div>
        </div>
    )
}

export default ClientControlResponse;

const ClearButton = styled.button`
    min-width: 8em;
    padding: 0.5em;
    font-weight: 600;
    color: #fff;
    background-color: red;
    border: none;
    border-radius: 5px;
`

const BackButton = styled.button`
    min-width: 8em;
    margin-right: 1em;
    padding: 0.5em;
    font-weight: 600;
    color: #fff;
    border: none;
    border-radius: 5px;
    background-color: grey;
`