const renderClientInfoTableRows = (rows) => {
    return rows.map(([label, data], i) => {

        return (
            <div className="client-control-info-table-row" key={i.toString()}>
                <div className='client-control-info-table-col label'>{label}</div>
                <div className='client-control-info-table-col data'>{data === true || data === false ? data.toString().toUpperCase() : data.toString()}</div>
            </div>
        )
    })
}

const ClientControlInformationTable = ({ client }) => {
    return (
            <div className="client-control-info-table">
                {renderClientInfoTableRows(Object.entries(client).sort(([a, b], [c, d]) => a.length - c.length))}
            </div>
    )
}

export default ClientControlInformationTable