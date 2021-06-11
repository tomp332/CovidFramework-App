import styled from '@emotion/styled'

const renderClientInfoTableRows = (rows) => {
    return rows.map(([label, data], i) => {
        if (label.toLowerCase() === "wifienabled")
            label = "Wifi"
        else if (label.toLowerCase() === "session_key")
            label = "Token"
        else if (label.toLowerCase() === "public_ip")
            label = "Public IP"
        else if (label.toLowerCase() === "client_id")
            label = "Client ID"
        else if (label.toLowerCase() === "lastactive")
            label = "Last-active"
        else if (label === "isConnected")
            label = "Status"
        else if (label.toLowerCase() === "listavs")
            label = "Antivirus"
        else if (label.toLowerCase() === "location") {
            if (data.country || data.city)
                data = `${data.country}, ${data.city}`
            else
                data = `Unknown`
        }
        return (
            <InfoSection key={i.toString()}>
                <InfoLabel>{label}</InfoLabel>
                {label === 'Status' ? 
                    (data ? 
                        (<InfoData style={{'color': '#28a745', 'fontWeight': 'bold'}}>
                            {data === true || data === false ? data.toString().toUpperCase() : data.toString()}) 
                        </InfoData>) : (
                        <InfoData style={{'color': 'red', 'fontWeight': 'bold'}}>
                            {data === true || data === false ? data.toString().toUpperCase() : data.toString()}
                        </InfoData>)
                    ) : (
                    <InfoData>
                        {data === true || data === false ? data.toString().charAt(0).toUpperCase() + data.toString().slice(1) : data.toString()}
                    </InfoData>)
                }

            </InfoSection>
        )
    })
}

const ClientControlInformationTable = ({client}) => {
    return (
        <Wrapper >
            {renderClientInfoTableRows(Object.entries(client))}
        </Wrapper>
    )
}

export default ClientControlInformationTable

const Wrapper = styled.div`
    padding: 0.5em;
`

const InfoSection = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr))
`

const InfoLabel = styled.div`
    font-weight: 600;
    text-transform: uppercase;
`

const InfoData = styled.div`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    min-width: 0;
`
