import React, {useState} from "react";
import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader,} from "react-pro-sidebar";
import {FaList} from "react-icons/fa";
import {BiBookAlt, BiWorld} from 'react-icons/bi';
import {BsFillPeopleFill} from 'react-icons/bs';
import {FiArrowLeftCircle, FiArrowRightCircle, FiHome, FiLogOut} from "react-icons/fi";
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.css";
import {NavLink} from "react-router-dom";
import logoSmall from '../../media/logoSmall.png';
import logoLarge from '../../media/logoLarge.png';
import {Link} from "@material-ui/core";
import {createSelector} from "reselect";
import {makeSelectAuthenticated} from "../../redux/selectors/userSelector";
import {useDispatch, useSelector} from "react-redux";
import {logUserOut} from '../../redux/actions/userActions'

const logOutDispatcher = (dispatch) => ({logUserOut: () => dispatch(logUserOut())})

const stateSelector = createSelector(makeSelectAuthenticated, (isAuthenticated) => ({
    isAuthenticated
}))

const Sidebar = () => {
    const {logUserOut} = logOutDispatcher(useDispatch())
    const {isAuthenticated} = useSelector(stateSelector)
    const [menuCollapse, setMenuCollapse] = useState(false);
    const menuIconClick = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };
    const logoutUser = async () => {
        logUserOut()
    }

    const Icon = () => {
        return (
            <img className="covidLogo" alt={""} src={logoSmall}/>
        );
    };

    const IconLarge = () => {
        return (
            <img className="covidLogoBig" alt={""} src={logoLarge}/>
        );
    };
    return (
        <>
            <div id="header">
                <ProSidebar collapsed={menuCollapse} id="sidebar-custom">
                    <SidebarHeader>
                        <div className="logotext" onClick={menuIconClick}>
                            {menuCollapse ? (
                                <FiArrowRightCircle/>
                            ) : (
                                <FiArrowLeftCircle/>
                            )}
                            {menuCollapse ? <Icon/> : <IconLarge/>}
                        </div>
                    </SidebarHeader>

                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItem active={true} icon={<FiHome/>} id={"pro-menu-item"}>
                                <NavLink to="/home">
                                    Home
                                </NavLink>
                            </MenuItem>
                            <MenuItem icon={<BsFillPeopleFill/>} id={"pro-menu-item"}>
                                <NavLink to="/clients">
                                    Clients
                                </NavLink>
                            </MenuItem>
                            <MenuItem icon={<BiWorld/>} id={"pro-menu-item"}>
                                <NavLink to="/map">
                                    Map
                                </NavLink>
                            </MenuItem>
                            <MenuItem icon={<BiBookAlt/>} id={"pro-menu-item"}>
                                <NavLink to="/docs">
                                    Docs
                                </NavLink>
                            </MenuItem>
                            <MenuItem icon={<FaList/>} id={"pro-menu-item"}>
                                <NavLink to="/settings">
                                    Settings
                                </NavLink>
                            </MenuItem>
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        {(!isAuthenticated) ? (
                            <Menu iconShape="square">
                                <MenuItem icon={<FiLogOut/>}>
                                    <NavLink to="/login">Login</NavLink>
                                </MenuItem>
                            </Menu>
                        ) : (
                            <Menu iconShape="square">
                                <MenuItem icon={<FiLogOut/>}>
                                    <Link to="/" onClick={logoutUser}>Logout</Link>
                                </MenuItem>
                            </Menu>
                        )}
                    </SidebarFooter>
                </ProSidebar>
            </div>
        </>
    );
};

export default Sidebar;