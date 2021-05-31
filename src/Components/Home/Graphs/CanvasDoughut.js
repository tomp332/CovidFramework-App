import {CanvasJSChart} from 'canvasjs-react-charts'


const CanvasDoughnut = (stats) => {
    let options = {
        width: 1000,
        height: 600,
        animationEnabled: true,
        exportEnabled: true,
        backgroundColor: "transparent",
        title: {
            text: "Client statistics",
            fontColor: "white"
        },
        fontColor: 'white',
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}%",
            startAngle: -90,
            indexLabelFontColor: "white",
            labelFontColor: "white",
            dataPoints: [
                {y: stats.stats.lowPrivs, label: "Low privileges", color: "#36a2eb"},
                {y: stats.stats.highPrivs, label: "High privileges", color: "#ffcd56"},
                {y: stats.stats.offlineClients, label: "Disconnected", color: "red"},
                {y: stats.stats.onlineClients, label: "Connected", color: "#98d14a"},
            ]
        }]
    }
    const containerProps = {
        width: "80%",
        height: "450px",
        margin: "auto"
    };
    return (
        <div id={"chartContainer1"}>
            <CanvasJSChart options={options}/>
        </div>
    )
}
export default CanvasDoughnut