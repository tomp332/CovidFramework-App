import React, {useContext} from 'react'
import styled from '@emotion/styled'
import {css, keyframes} from '@emotion/react'

const Page = ({ title, children }) => {
    return (
        <PageWrapper>
            { children }
        </PageWrapper>    
    )
}

const PageWrapper = style.div`
    width: 100%;
    height: 100vh;
`

export default Page