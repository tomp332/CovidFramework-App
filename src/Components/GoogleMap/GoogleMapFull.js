import React, {useEffect, useState} from "react";
import {GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import virus from '../../../src/media/virus.svg'
import axios from "../../axios";

function GlobalMap() {

    const [displayClient, setDisplayClient] = useState(false); // if to display popup for client
    const [currentClient, setCurrentClient] = useState(null); //current client that has been clicked
    const [allClients, setAllClients] = useState(null)

    function getLocations() {
        axios({
            url: `/api/clients/locations`,
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
            .then(clients => {
                setAllClients(clients.data)
            })
            .catch(e => e)
    }

    useEffect(() => {
        getLocations();
        let handle = setInterval(getLocations, 3000)
        return () => {
            setDisplayClient(false)
            setCurrentClient(null)
            setAllClients(null)
            clearInterval(handle);
        };
    }, []);

    function displayClientInfo() {
        let currentLat = currentClient?.location.lat;
        let currentLng = currentClient?.location.lng;
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
                            <li>ID:{currentClient.client_id}</li>
                            {currentClient.isConnected ?
                                (<li><p style={{"color": "green"}}>Status: Connected</p></li>) :
                                (<li><p style={{"color": "red"}}>Status: Disconnected</p></li>)
                            }
                            <li>Country: {currentClient.location.country}</li>
                            <li>City: {currentClient.location.city}</li>
                            <li>Home address: {currentClient.location.home_address}</li>
                        </ul>
                    </div>
                </InfoWindow>
                }
            </>
        )
    }

    function createClientIcon(client) {
        return (
            <Marker
                key={client.clientId}
                position={{
                    lat: client.location.lat,
                    lng: client.location.lng
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
        )
    }

    return (
        <>
            <GoogleMap defaultZoom={8} defaultCenter={{lat: 31.066830, lng: 34.897993}}>
                {allClients && allClients.map(client => createClientIcon(client))}
                {displayClient && (displayClientInfo())}
            </GoogleMap>
        </>
    )

}

const WrappedMap = withScriptjs(withGoogleMap(GlobalMap));

function GoogleMapFull() {
    let fullUrl = `https://maps.googleapis.com/maps/api/js?&libraries=geometry,drawing,places&key=AIzaSyCdThihts7X0VeVH_GKHGbGp1Nv2LjsFFE`
    return <div className={"map"}>

        <WrappedMap
            googleMapURL={fullUrl}
            loadingElement={<div style={{height: "100%"}}/>}
            containerElement={<div style={{height: "100%"}}/>}
            mapElement={<div style={{height: "100%"}}/>}
        />
    </div>;
}

export default GoogleMapFull;