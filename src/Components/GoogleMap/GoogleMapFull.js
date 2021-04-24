import React, {useEffect, useState} from "react";
import {GoogleMap, withGoogleMap, withScriptjs,Marker, InfoWindow} from "react-google-maps";


function GlobalMap(){

    const [displayClient, setDisplayClient] = useState(false); // if to display popup for client
    const [currentClient, setCurrentClient] = useState({}); //current client that has been clicked
    const [clients, setClients] = useState(null); // new locations that come in from server

    function getLocations()
    {
        fetch('http://10.0.0.4:443/api/clients/locations',{credentials:"include"})
            .then(response=>response.json())
            .then(clients=> {
                setClients(clients)
            })
    }
    useEffect(() => {
        getLocations();
        let handle = setInterval(getLocations,3000);
        return ()=> {clearInterval(handle);
        };
    },[]);

    function displayClientInfo()
    {
        let currentLat = currentClient.lat;
        let currentLng = currentClient.lng;
        return(
            <>
                {(currentLng && currentLat) &&
                <InfoWindow
                    onCloseClick={() => {
                        setDisplayClient(false);
                    }}
                    position={{
                        lat: currentLat,
                        lng: currentLng
                    }}
                >
                    <div>
                        <h5>Infected client:</h5>
                        <ul>
                            <li>ID: {currentClient.client_id}</li>
                            {currentClient.status ?
                                (
                                    <li>Status: Connected</li>
                                ):(
                                    <li>Status: Disconnected</li>
                                )
                            }
                        </ul>
                    </div>
                </InfoWindow>
                }
            </>
        )
    }


    return (
        <>
            <GoogleMap defaultZoom={8} defaultCenter={{lat:31.066830,lng:34.897993}}>
                {clients && clients.map(client => (
                <Marker
                    key={client.clientId}
                    position={{
                        lat:client.lat,
                        lng:client.lng
                    }}
                    onClick={() => {
                        setDisplayClient(true);
                        setCurrentClient(client);
                    }}

                />
                ))}
                {displayClient && (displayClientInfo())};
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