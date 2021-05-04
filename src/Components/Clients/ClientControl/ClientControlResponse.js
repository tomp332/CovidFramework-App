import { NavLink } from "react-router-dom";


const responseBanner = (responseObject) => {
    return(
        `\n[>>] New response: ${responseObject.date}  [<<]\n`+
        `\r${responseObject.response}`+
        "\r[>>] ___________________________________________________________ [<<]\n"
    )
}

const ClientControlResponse = ({ clientResponse, allResponses}) => {

    let responseString = '';
    const displayResponse = () => {
        allResponses.forEach( resp =>{
            responseString += responseBanner(resp)
        });
        return(clientResponse && responseString)
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
                    <button className="command-button cancel">Clear</button>
                    <NavLink to={"/clients"}>
                        <button
                            className="command-button"
                            href="/clients"
                            variant={"success"}
                        >
                            Back
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default ClientControlResponse;

