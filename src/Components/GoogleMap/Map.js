import "./Map.css";
import React from 'react';
import Title from '../Title/Title'
import GoogleMapFull from './GoogleMapFull';

const Map = () => {
    return (
        <div className="mapPageWrapper">
            <div className="title">
                <Title text1={"INFECTION"}  text2="LOCATIONS" open={true}/>
            </div>
            <GoogleMapFull/>
        </div>
    )
}
export default Map;
