import "./Map.css";
import React from 'react';
import Title from '../Title/Title'
import GrafanaIframe from "../GrafanaIframes/GrafanaIframe";

const Map = () => {
    return (
        <div className="mapPageWrapper">
            <div className="title">
                <Title text1={"INFECTION"} text2="LOCATIONS" open={true}/>
            </div>
            <GrafanaIframe
                url={`https://${process.env.REACT_APP_API_URL}/graphs/d-solo/kmhuyCM7z/covid-19-satistics?orgId=1&refresh=5s&from=1629143095213&to=1629143095213&theme=dark&panelId=10`}
                height={"250"} width={"1000"} frameBorder={"0"} title={"C&C"}/>
            <GrafanaIframe
                url={`https://${process.env.REACT_APP_API_URL}/graphs/d-solo/kmhuyCM7z/covid-19-satistics?orgId=1&refresh=5s&from=1629131635348&to=1629131635348&theme=dark&panelId=5`}
                height={"800"} width={"1000"} frameBorder={"0"} title={"Map"}/>
        </div>
    )
}
export default Map;
