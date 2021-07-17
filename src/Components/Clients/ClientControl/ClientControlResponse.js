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
            </div>
        </div>
    )
}

export default ClientControlResponse;