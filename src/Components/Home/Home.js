import "./Home.css";
import Title from "react-titles/Title6";
import React, {useEffect, useState} from "react";
import {getStatistics} from "../../api/api";
import {Spinner} from "reactstrap";
import styled from '@emotion/styled';
import BarGraph from "./Graphs/BarChart";
import PolarChart from "./Graphs/PolarChart";
import {makeSelectUser} from "../../redux/selectors/userSelector";
import {createSelector} from "reselect";
import {useSelector} from "react-redux";

const stateSelector = createSelector(makeSelectUser, (user) => ({
    user
}))

const Home = () => {
    const {user} = useSelector(stateSelector)
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
            {(user.username !== null) ? (
                <>
                    <div className="title">
                        <Title size={500} text1={`WELCOME ${user.username.toUpperCase()}`} open={true}/>
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