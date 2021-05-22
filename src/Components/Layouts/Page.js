import React, {useContext} from 'react'
import Sidebar from '../Sidebar/Sidebar';
import styled from '@emotion/styled'
import {css, keyframes} from '@emotion/react'

const Page = ({ title, children }) => {
    return (
        <PageWrapper>
            <Sidebar/>
            <div>
                { children }
            </div>
        </PageWrapper>    
    )
}

const PageWrapper = styled.div` 

    width: 100%;
    display: flex;

    @media only screen and (min-width: 0px) and (max-width:375px) {
        flex-direction: column;
    }
`

export default Page