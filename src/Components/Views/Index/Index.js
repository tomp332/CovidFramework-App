import React from 'react';
import Title from "react-titles/Title6";
import {Link} from "react-router-dom";
import styled from '@emotion/styled'
import {css, keyframes} from '@emotion/react'
import { useMediaQuery } from 'react-responsive'


const MobileTitle = ({ children }) => {
    const isMobile = useMediaQuery({
        query: '(min-width: 0px) and (max-width:375px)',
    })
    return isMobile ? <Title size={300} text1="THE COVID" text2="FRAMEWORK" open={true}/> : null
}

const TabletTitle = ({ children }) => {
    const isTablet = useMediaQuery({
        query: '(min-width: 376px) and (max-width:1024px)',
    })
    return isTablet ? <Title size={500} text1="THE COVID" text2="FRAMEWORK" open={true}/> : null
}

const Index = () => {
    return (
        <PageWrapper>
            <MobileTitle/>
            <TabletTitle/>
            <LoginButton to="/login">Login</LoginButton>
        </PageWrapper>
    );
};

export default Index;

const StyledTitle = styled(Title)`
`

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`

const LoginButton = styled(Link)`
    background: #97d049;
    border-radius: 5px;
    border: none;
    outline: none;
    font-size: 2em;
    font-weight: 200;
    transition: filter 0.3s;
    filter: brightness(85%);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    margin-top: 2em;
    color: #000;
    padding: 0.125em 2em;

    &:hover {
        text-decoration: none;
        color: inherit;
        filter: brightness(100%);
    }

    &:visited: {
        color: inherit;
    }
`
