import { NavLink } from "react-router-dom";

const responseBanner = (text) => {
    return `\n*************************** New response ***************************\n
            \r${text}
            \r\n_______________________________________________________________________\n`
}

const ClientControlResponse = ({ clientResponse, allResponses}) => {
    // console.log(clientResponse, allResponses)
    let responseString = '';

    const displayResponse = () => {
        allResponses.forEach( resp =>{
            responseString += responseBanner(resp)
        });
        return(clientResponse && responseString)
        //     <textarea rows={10} disabled={true} className={"response"}
        //         value={"Test"}
        //     />
        // )
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

