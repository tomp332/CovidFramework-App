import React from 'react';
import Title from "react-titles/Title6";
import {Link} from "react-router-dom";
import styled from '@emotion/styled'
import {css, keyframes} from '@emotion/react'


const Index = () => {
    return (
        <PageWrapper>
            <Title size={800} text1="THE COVID" text2="FRAMEWORK" open={true}/>
            <LoginButton to="/login">Login</LoginButton>
        </PageWrapper>
    );
};

export default Index;

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
