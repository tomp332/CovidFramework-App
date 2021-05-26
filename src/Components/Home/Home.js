import "./Home.css";
import Title from "react-titles/Title6";
import React, {useContext, useEffect, useState} from "react";
import UserContext from '../../Components/User'
import {getStatistics} from "../../api/api";
import {Spinner} from "reactstrap";
import styled from '@emotion/styled';
import BarGraph from "./Graphs/BarChart";
import PolarChart from "./Graphs/PolarChart";


const Home = () => {
    const {userInfo} = useContext(UserContext);
    const [allStatistics, setAllStatistics] = useState({})

    useEffect(() => {
        let handle = setInterval(clientsStatistics, 2000);
        return () => {
            setAllStatistics(false)
            clearInterval(handle);
        };
    }, []);

    const renderCharts = () => {
        if (allStatistics !== {}) {
            if ((allStatistics?.onlineClients > 0) || (allStatistics?.offlineClients > 0)) { // there is data to display
                return (
                    <div className={"graphs"}>
                        <PolarChart stats={allStatistics}/>
                        {<BarGraph stats={null}/>}
                    </div>
                )
            } else {  // no data to display, show text box
                return (
                    <>
                        <NoDataMessage>Loading data..</NoDataMessage>
                        <Spinner actions={"border"} color={"success"} type="grow"/>
                    </>
                )
            }
        } else {
            return (<Spinner actions={"border"} color={"success"} type="grow"/>)
        }
    }

    function clientsStatistics() {
        getStatistics().then((data) => {
            setAllStatistics(data.data)
        }).catch(() => setAllStatistics(null))
    }

    return (
        <div className="homePageWrapper">
            {(userInfo.username !== null) ? (
                <>
                    <div className="title">
                        <Title size={500} text1={`WELCOME ${userInfo.username.toUpperCase()}`} open={true}/>
                    </div>
                    <>
                        {renderCharts()}
                    </>
                </>
            ) : (
                <Spinner actions={"border"} color={"success"} type="grow"/>
            )}
        </div>

    )
}
export default Home;


const NoDataMessage = styled.h3`
  color: black;
  margin: auto;
  background: #98d14a;
  padding: 0.3em;
  border-radius: 5px;
`