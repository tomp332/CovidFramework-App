import "./Home.css";
import Title from "react-titles/Title6";
import {useContext} from "react";
import UserContext from '../../Components/User'


const Home = () =>{
    const {userInfo} = useContext(UserContext);
    const newUserName = userInfo.username.toUpperCase();
    return(
        <div className="homePageWrapper">
            <div className="title">
                <Title size="500" text1={`WELCOME ${newUserName}`}  open={true} />
            </div>
        </div>
    )
}
export default Home;