import "./Map.css";
import React from 'react';
import Title from "react-titles/Title6";
import {GoogleMap, withGoogleMap, withScriptjs} from 'react-google-maps';

function GlobalMap(){
    return <GoogleMap defaultZoom={8} defaultCenter={{lat:31.066830,lng:34.897993}} />
}

const WrappedMap = withScriptjs(withGoogleMap(GlobalMap));

const Map = () =>{
    return(
        <div className="mapPageWrapper">
            <div className="title">
                <Title size="200" text1="MAP"  open={true} />
            </div>
            <div className={"map"}>
                <WrappedMap
                    googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyCdThihts7X0VeVH_GKHGbGp1Nv2LjsFFE&callback=initMap"}
                    loadingElement={<div style={{height:"100%"}}/>}
                    containerElement={<div style={{height:"100%"}}/>}
                    mapElement={<div style={{height:"100%"}}/>}
                />
            </div>

        </div>
    )
}
export default Map;