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
    }
`

const MainContent = styled.div`
    border: 1px solid red;

    @media only screen and (max-width:768px) {
        padding: 1em 0;
    }
`

export default Page