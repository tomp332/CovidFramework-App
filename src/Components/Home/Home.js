import "./Home.css";
import Title from "react-titles/Title6";
import UserContext from '../../Components/User';
import {useContext} from "react";

const Home = () =>{
    const user = useContext(UserContext);
    return(
        <div className="homePageWrapper">
            <div className="title">
                <Title size="500" text1={`WELCOME ${user.username}`}  open={true} />
            </div>
        </div>
    )
}
export default Home;