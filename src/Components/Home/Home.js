import "./Home.css";
import Title from "react-titles/Title6";
import React, {useContext, useEffect, useState} from "react";
import UserContext from '../../Components/User'
import DoughnutChart from "./Graphs/DoughnutChart";
import {getStatistics} from "../../api/api";
import {Spinner} from "reactstrap";


const Home = () => {
    const {userInfo} = useContext(UserContext);
    const newUserName = userInfo.username.toUpperCase();
    const [allStatistics, setAllStatistics] = useState(null)

    useEffect(() => {
        clientsStatistics().then().catch()
        let handle = setInterval(clientsStatistics, 2000);
        return () => {
            clearInterval(handle);
        };
    }, []);


    async function clientsStatistics() {
        let allStats = await getStatistics().then((data) => data.data).catch(() => null)
        setAllStatistics(allStats)
    }

    return (
        <div className="homePageWrapper">
            <div className="title">
                <Title size={500} text1={`WELCOME ${newUserName}`} open={true}/>
            </div>
            <div className={"graphs"}>
                {allStatistics ? <DoughnutChart stats={allStatistics}/> : <Spinner actions={"border"} color={"success"} type="grow"/>}}
            </div>
        </div>
    )
}
export default Home;