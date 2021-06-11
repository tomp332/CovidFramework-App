import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import styled from '@emotion/styled'

const Page = ({ children }) => {
    return (
        <PageWrapper>
            <Sidebar/>
            <MainContent>
                { children }
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
    }
`

export default Page