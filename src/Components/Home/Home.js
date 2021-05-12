import "./Home.css";
import Title from "react-titles/Title6";
import React, {useContext, useEffect, useState} from "react";
import UserContext from '../../Components/User'
import DoughnutChart from "./Graphs/DoughnutChart";
import {getStatistics} from "../../api/api";
import {Spinner} from "reactstrap";
import styled from '@emotion/styled';


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
                        <DoughnutChart stats={allStatistics}/>
                    </div>
                )
            } else {  // no data to display, show text box
                return (
                    <>
                        <NoDataMessage>No client data to display</NoDataMessage>
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
            // console.log(data)
            setAllStatistics(data.data)
        }).catch(() => setAllStatistics(null))
    }

    return (
        <div className="homePageWrapper">
            <div className="title">
                <Title size={500} text1={`WELCOME ${userInfo.username.toUpperCase()}`} open={true}/>
            </div>
            {renderCharts()}
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