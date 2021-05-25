import "./Map.css";
import React from 'react';
import Title from "react-titles/Title6";
import GoogleMapFull from './GoogleMapFull';

const Map = () => {
    return (
        <div className="mapPageWrapper">
            <div className="title">
                <Title size={200} text1="MAP" open={true}/>
            </div>
            <GoogleMapFull/>
        </div>
    )
}
export default Map;