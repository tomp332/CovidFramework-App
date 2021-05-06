const ClientControlSection = ({title, children}) => {
    return (
        <div className="client-control-info-section">
            <h1 className="client-control-section-title">{title}</h1>
            {children}
        </div>
    )
}

export default ClientControlSection;