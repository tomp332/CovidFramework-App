import "./Settings.css";
import React from 'react';
import Title from "react-titles/Title6";
const Settings = () =>{
    return(
        <div className="settingsPageWrapper">
            <div className="title">
                <Title size="300" text1="SETTINGS"  open={true} />
            </div>
        </div>
    )
}
export default Settings;