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
        flex-direction: column;
        height: 100%;
    }
`

const MainContent = styled.div`
    flex: 1 1 auto;

    @media only screen and (max-width:768px) {
        padding: 1em 0;
    }
`

export default Page