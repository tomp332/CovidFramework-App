const renderCommandOptions = (commands) => {
    return commands.map((command, i) => (
        // values are calculated as removing the spaces from a command
        <option value={command.split(" ").join('')}key={i.toString()}>{command}</option>
    ))
}

const ClientControlCommand = ({ commands }) => {
    console.log(commands)
    return (
        <div className="client-control-info-table-row client-command">
            <select className="client-control-command-select">
                <option disabled selected>Select Command</option>
                {commands && renderCommandOptions(commands)}
            </select>
            <div className="client-control-command-buttons">
                <button className="command-button cancel">Cancel</button>
                <button className="command-button">Send</button>
            </div>
        </div>
    )
}

export default ClientControlCommand;