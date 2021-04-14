import React from "react";
import {GoogleMap, withGoogleMap, withScriptjs} from "react-google-maps";

function GlobalMap(){
    return <GoogleMap defaultZoom={8} defaultCenter={{lat:31.066830,lng:34.897993}} />
}
const WrappedMap = withScriptjs(withGoogleMap(GlobalMap));
function GoogleMapFull(){
    return <div className={"map"}>
        <WrappedMap
            googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyCdThihts7X0VeVH_GKHGbGp1Nv2LjsFFE&callback=initMap"}
            loadingElement={<div style={{height: "100%"}}/>}
            containerElement={<div style={{height: "100%"}}/>}
            mapElement={<div style={{height: "100%"}}/>}
        />
    </div>;
}
export default GoogleMapFull;