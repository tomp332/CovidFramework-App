import Title from '../Title/Title'
import React from "react";
import {downloadAgent} from "../../api/api";
import styled from '@emotion/styled';
import {makeSelectUser} from "../../redux/selectors/userSelector";
import {createSelector} from "reselect";
import {useSelector} from "react-redux";
import GrafanaIframe from "../GrafanaIframes/GrafanaIframe";

const stateSelector = createSelector(makeSelectUser, (user) => ({
    user
}))

const Home = () => {
    const {user} = useSelector(stateSelector)

    return (
        <HomePageWrapper className="homePageWrapper">
            <Title text1="WELCOME" text2={user.username.toUpperCase()} open={true}/>
            <ChartsWrapper>
                <GrafanaIframe
                    url={`https://${process.env.REACT_APP_API_URL}/graphs/d-solo/kmhuyCM7z/covid-19-satistics?orgId=1&from=1629228913371&to=1629228913371&refresh=5s&theme=dark&panelId=6`}
                    height={"400"} width={"600"} frameBorder={"0"} title={"PieChart"}/>
                <GrafanaIframe
                    url={`https://${process.env.REACT_APP_API_URL}/graphs/d-solo/kmhuyCM7z/covid-19-satistics?orgId=1&refresh=5s&from=1629131657534&to=1629131657534&theme=dark&panelId=8`}
                    height={"400"} width={"600"} frameBorder={"0"} title={"GaugeChart"}/>
            </ChartsWrapper>
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

const ChartsWrapper = styled.div`
  margin: 2em 3vh;
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