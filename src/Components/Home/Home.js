import "./Home.css";
import Title from '../Title/Title'
import React, {useEffect, useState} from "react";
import {getStatistics} from "../../api/api";
import {Spinner} from "reactstrap";
import styled from '@emotion/styled';
import {makeSelectUser} from "../../redux/selectors/userSelector";
import {createSelector} from "reselect";
import {useSelector} from "react-redux";
<<<<<<< HEAD
import DoughnutChart from './Graphs/DoughnutChart'
=======
import ApexChart from "./Graphs/ApexDoughnutChart";
import ResponsiveBarChart from "./Graphs/ApexBarChart";
>>>>>>> dbbdb3964ea5bb4238edc514eba3038670545f2d

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
                    <div>
<<<<<<< HEAD
                        <DoughnutChart stats={allStatistics}/>
                        <DoughnutChart stats={allStatistics}/>
=======
                        <ApexChart stats={allStatistics}/>
                        <ResponsiveBarChart stats={allStatistics}/>
>>>>>>> dbbdb3964ea5bb4238edc514eba3038670545f2d
                    </div>
                )
            } else { // no data to display, show text box
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
            <Title text1="WELCOME" text2={user.username.toUpperCase()} open={true}/>
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