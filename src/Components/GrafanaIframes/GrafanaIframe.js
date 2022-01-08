import React from "react";

const GrafanaIframe = (props) => {
    return (
        <iframe loading={"lazy"} src={props.url} width={props.width} height={props.height}
                frameBorder={props.frameBorder} title={props.title}/>
    )
}

export default GrafanaIframe;
