import {CanvasJSChart} from 'canvasjs-react-charts'

const CanvasBar = (stats) => {
    let options = {
        width: 700,
        height: 600,
        animationEnabled: true,
        exportEnabled: true,
        backgroundColor:"transparent",
        title: {
            text: "Client connections",
            fontColor:"white"
        },
        data: [{
            type: "spline",
            indexLabel: "{label}: {y}%",
            indexLabelFontColor: "white",
            startAngle: -90,
            dataPoints: [
                {y: stats.stats.lowPrivs, label: "Low privileges", color: "#36a2eb"},
                {y: stats.stats.highPrivs, label: "High privileges", color: "#ffcd56"},
                {y: stats.stats.offlineClients, label: "Disconnected", color: "red"},
                {y: stats.stats.onlineClients, label: "Connected", color: "#98d14a"},
            ]
        }]
    }
    return (
        <div id={"chartContainer2"}>
            <CanvasJSChart options={options}/>
        </div>
    )
}
export default CanvasBar