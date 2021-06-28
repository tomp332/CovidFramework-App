import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import styled from '@emotion/styled'

const Page = ({children}) => {
    return (
        <PageWrapper className="page-wrapper">
            <Sidebar/>
            <MainContent className="main-content">
                {children}
            </MainContent>
        </PageWrapper>
    )
}

const PageWrapper = styled.div` 
    width: 100%;
    display: flex;

    @media only screen and (max-width:768px) {
        flex-direction: column;
        flex: 1 1;
        align-items: center;
        height: auto;
    }
`

const MainContent = styled.div`
    flex: 1 1 auto;
    padding: 2em;
    margin: 0 auto;
    justify-self: center;
    margin-left: 158.1px;

    @media only screen and (max-width:768px) {
        padding: 1em 0;
        margin-top: 90px;
        margin-left: auto;
    }
`

export default Page