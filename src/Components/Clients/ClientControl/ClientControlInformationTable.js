const renderClientInfoTableRows = (rows) => {
    return rows.map(([label, data], i) => {

        return (
            <div className="client-control-info-table-row" key={i.toString()}>
                <div className='client-control-info-table-col label'>{label}</div>
                <div className='client-control-info-table-col data'>{data.toString()}</div>
            </div>
        )
    })
}

const ClientControlInformationTable = ({ client }) => {
    console.log(client)
    return (
            <div className="client-control-info-table">
                {renderClientInfoTableRows(Object.entries(client))}
            </div>
    )
}

export default ClientControlInformationTable