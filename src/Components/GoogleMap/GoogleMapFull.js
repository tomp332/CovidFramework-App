import React, {useEffect, useState} from "react";
import {GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import virus from '../../../src/media/virus.svg'

function GlobalMap() {

    const [displayClient, setDisplayClient] = useState(false); // if to display popup for client
    const [currentClient, setCurrentClient] = useState({}); //current client that has been clicked
    const [clients, setClients] = useState(null); // new locations that come in from server

    function getLocations() {
        fetch(`${process.env.REACT_APP_PROTOCOL}${process.env.REACT_APP_REMOTE_URL}:${process.env.REACT_APP_REMOTE_PORT}/api/clients/locations`, {credentials: "include"})
            .then(response => response.json())
            .then(clients => {
                setClients(clients)
            })
    }

    useEffect(() => {
        getLocations();
        let handle = setInterval(getLocations, 3000);
        return () => {
            clearInterval(handle);
        };
    }, []);

    function displayClientInfo() {
        let currentLat = currentClient.lat;
        let currentLng = currentClient.lng;
        return (
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
                                ) : (
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
            <GoogleMap defaultZoom={8} defaultCenter={{lat: 31.066830, lng: 34.897993}}>
                {clients && clients.map(client => (
                    <Marker
                        key={client.clientId}
                        position={{
                            lat: client.lat,
                            lng: client.lng
                        }}
                        onClick={() => {
                            setDisplayClient(true);
                            setCurrentClient(client);
                        }}
                        icon={{
                            url: virus,
                            anchor: new window.google.maps.Point(17, 46),
                            scaledSize: new window.google.maps.Size(37, 37)
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

function GoogleMapFull() {

    return <div className={"map"}>

        <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?&libraries=geometry,drawing,places&key=${process.env.GOOGLE_API_KEY}`}
            loadingElement={<div style={{height: "100%"}}/>}
            containerElement={<div style={{height: "100%"}}/>}
            mapElement={<div style={{height: "100%"}}/>}
        />
    </div>;
}

export default GoogleMapFull;