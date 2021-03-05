import React, {useState} from 'react';
import ReactRouter from "./Routes/AllRoutes";
import './App.css';
import UserContext from "./Components/User";

function App() {
  const user = {
        username: null,
        isAuthenticated:false
  };
  const [userInfo, setUserInfo]  = useState(user);

  return (
      <div className="wrapper">
      <UserContext.Provider value={{userInfo,setUserInfo}}>
          <ReactRouter />
      </UserContext.Provider>
      </div>
  );
}
export default App;
