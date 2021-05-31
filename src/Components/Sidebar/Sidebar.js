import React, {useState} from "react";
import React, {useState} from "react";
import {Menu, MenuItem} from "react-pro-sidebar";

import "react-pro-sidebar/dist/css/styles.css";
import {NavLink} from "react-router-dom";
import logoLarge from '../../media/logoLarge.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,
         faUsers,
         faMapMarkerAlt, 
         faBook, 
         faCog, 
         faSignInAlt, 
         faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import styled from '@emotion/styled'
import {createSelector} from "reselect";
import {makeSelectAuthenticated} from "../../redux/selectors/userSelector";
import {useDispatch, useSelector} from "react-redux";
import {logUserOut} from '../../redux/actions/userActions'


const menuItemList = [
    {
        icon: faHome,
        label: 'home',
        link: '/home'
    },
    {
        icon: faUsers,
        label: 'clients',
        link: '/clients'
    },
    {
        icon: faMapMarkerAlt,
        label: 'map',
        link: '/map'
    },
    {
        icon: faBook,
        label: 'docs',
        link: '/docs'
    },
    {
        icon: faCog,
        label: 'settings',
        link: '/settings'
    }
]




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

    function renderMenuItem() {

        if (!isAuthenticated) {
            return (
                <MenuItem key={label} collapsed={menuCollapse}>
                    <StyledNavLink to={'/home'}>
                        <MenuIconWrapper>
                            <FontAwesomeIcon icon={faHome}/>
                        </MenuIconWrapper>
                        <p>{'home'}</p>
                    </StyledNavLink>
                </MenuItem>
            )
        } else {
            return menuItemList.map(({icon, label, link}) => {
                return (
                    <MenuItem key={label} collapsed={menuCollapse}>
                        <StyledNavLink to={link}>
                            <MenuIconWrapper>
                                <FontAwesomeIcon icon={icon}/>
                            </MenuIconWrapper>
                            <p>{label}</p>
                        </StyledNavLink>
                    </MenuItem>
                )
            })
        }
    }

    return (
        <SidebarWrapper>
            <Nav collapsed={menuCollapse}>
                    <IconWrapper>
                        <Icon collapsed={menuCollapse} onClick={() => setMenuCollapse(!menuCollapse)} alt={""} src={logoLarge}/>
                    </IconWrapper>
                    <MenuWrapper collapsed={menuCollapse}>
                        <Menu collapsed={menuCollapse}>
                            {renderMenuItem()}
                            {!isAuthenticated ?
                                <MenuItem className="foot" collapsed={menuCollapse}>
                                    <StyledNavLink to="/login">
                                        <MenuIconWrapper>
                                            <FontAwesomeIcon icon={faSignInAlt}/>
                                        </MenuIconWrapper>               
                                        <p>Login</p>
                                    </StyledNavLink>
                                </MenuItem> :
                                <MenuItem onClick={logoutUser} className="foot" collapsed={menuCollapse}>
                                    <StyledNavLink to="/">
                                        <MenuIconWrapper>
                                            <FontAwesomeIcon icon={faSignOutAlt}/>
                                        </MenuIconWrapper>
                                        <p>Logout</p>
                                    </StyledNavLink>
                                </MenuItem>
                            }
                        </Menu>
                    </MenuWrapper>

            </Nav>
        </SidebarWrapper>
    );
};

export default Sidebar;

const SidebarWrapper = styled.div`

    @media only screen and (max-width:768px) {
        width: 100vw;
    }
`
const Nav = styled.nav`
    background: ${props => props.theme.colors.bgMain};
    height: 100vh;
    transition: width 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;


    @media only screen and (max-width:768px) {
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: auto;
        width: 100%;
        & img {
            display: none
        }
    }
`

const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 12vh;
    cursor: pointer;

    @media only screen and (max-width:768px) {
        display: none
    }
`

const Icon = styled.img`
    height: ${props => props.collapsed ? '50%' : '96px'};
    width: auto;
    transition: height 0.1s;
`

const MenuWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;

    @media only screen and (max-width:768px) {
        margin-top: 1em;
    }
`

const Menu = styled.ul`
    display: flex;
    flex-direction: column; 
    justify-content: flex-start;
    align-items: center;
    padding: 1em;
    transition: all 0.1s ease;
    height: 100%;
    
    // mobile
    @media only screen and (max-width:768px) {
        flex-direction: row; 
        justify-content: space-evenly;
        align-items: center;
        padding: 0 0;
        box-shadow: 0 3px 5px 0 ${props => props.theme.colors.bgMain}60;
     }
`

const MenuItem = styled.li`
    list-style-type: none;
    width: 100%;
    margin-bottom: 1rem;
    text-transform: capitalize;

    & p {
        display: ${props => props.collapsed ? 'none' : 'flex'};
        margin-left: 0.75em;
        transition: all 0.1s ease;
    }

    &.foot {
        margin-top: auto;
    }

    // mobile
    @media only screen and (max-width:768px) {
        padding: 0.5em;
        margin: 0; 
        & p {
            display: none;
        }
    }
`

const StyledNavLink = styled(NavLink)`
    width: 100%;
    text-decoration: none;
    color: white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.5em;

    & * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    &.active {
        color: ${props => props.theme.colors.primary};
    }

    &:hover {
        color: ${props => props.theme.colors.primary};
        text-decoration: none;
    }
    // mobile
    @media only screen and (max-width:768px) {
        font-size: 1.3em;
    }

`

const MenuIconWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 0.25em;
    min-width: 2em;
    `

