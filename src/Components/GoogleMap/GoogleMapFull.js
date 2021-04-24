import React, {useState} from "react";
import {GoogleMap, withGoogleMap, withScriptjs,Marker, InfoWindow} from "react-google-maps";


function GlobalMap(){
    const exampleClient = {
        clientId:"15xz67",
        username:"Dblet",
        status:true,
        lat:32.081545561398116,
        lng:34.77447726977539
    }
    const [selectedClient, setSelectedClient] = useState(false);
    const [currentClient, setCurrentClient] = useState(exampleClient);
    return (
        <>
            <GoogleMap defaultZoom={8} defaultCenter={{lat:31.066830,lng:34.897993}}>
                <Marker
                    key={exampleClient.clientId}
                    position={{
                        lat:exampleClient.lat,
                        lng:exampleClient.lng
                    }}
                    onClick={() => {
                        setSelectedClient(true);
                        // currentClient(exampleClient);
                    }}

                />
                ))}

                {selectedClient && (
                    <InfoWindow
                        onCloseClick={() => {
                            setSelectedClient(false);
                        }}
                        position={{
                            lat: currentClient.lat,
                            lng: currentClient.lng
                        }}
                    >
                        <div>
                            <h5>Infected client:</h5>
                            <ul>
                                <li>ID: {currentClient.clientId}</li>
                                {currentClient.status ?
                                    (
                                        <li>Status: Connected</li>
                                    ):(
                                        <li>Status: Disconnected</li>
                                    )
                                }
                            </ul>

                        </div>
                    </InfoWindow>)};
            </GoogleMap>
            )}
        </>
    )

}
const WrappedMap = withScriptjs(withGoogleMap(GlobalMap));

function GoogleMapFull(){

    return <div className={"map"}>

        <WrappedMap
            googleMapURL={"https://maps.googleapis.com/maps/api/js?&libraries=geometry,drawing,places&key=AIzaSyCdThihts7X0VeVH_GKHGbGp1Nv2LjsFFE"}
            loadingElement={<div style={{height: "100%"}}/>}
            containerElement={<div style={{height: "100%"}}/>}
            mapElement={<div style={{height: "100%"}}/>}
        />
    </div>;
}
export default GoogleMapFull;