
const renderClientInfoTableRows = (rows) => {
    return rows.map(([label, data], i) => {
        console.log(label)
        if(label.toLowerCase() === "wifienabled")
            label = "Wifi"
        if(label.toLowerCase() === "session_key")
            label = "Session-token"
        if(label.toLowerCase() === "public_ip")
            label = "Public IP"
        if(label.toLowerCase() === "client_id")
            label = "Client ID"
        return (
            <div className="client-control-info-table-row" key={i.toString()}>
                <div className='client-control-info-table-col label'>{label}</div>
                {label.toLowerCase() === 'status' ? (
                        data ? (<div style={{'color':'#28a745','font-weight':'bold'}} className='client-control-info-table-col data'>
                            {data === true || data === false ? data.toString().toUpperCase() : data.toString()}</div>):(<div style={{'color':'red','font-weight':'bold'}} className='client-control-info-table-col data'>
                            {data === true || data === false ? data.toString().toUpperCase() : data.toString()}</div>)
                ):(
                    <div className='client-control-info-table-col data'>
                        {data === true || data === false ? data.toString().charAt(0).toUpperCase() + data.toString().slice(1) : data.toString()}</div>
                )}

            </div>
        )


    })
}

const ClientControlInformationTable = ({ client }) => {
    return (
            <div className="client-control-info-table">
                {renderClientInfoTableRows(Object.entries(client))}
            </div>
    )
}

export default ClientControlInformationTable