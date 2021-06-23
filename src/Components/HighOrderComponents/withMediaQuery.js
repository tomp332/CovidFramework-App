import React from 'react'
import {useMediaQuery} from 'react-responsive'

const MobileWrapper = ({children, props}) => {
    const isMobile = useMediaQuery({
        query: '(max-width:480px)',
    })
    return isMobile ? <div {...props}> {children} </div> : null
}

const TabletWrapper = ({children, props}) => {
    const isTablet = useMediaQuery({
        query: '(min-width: 481px) and  (max-width: 768px)',
    })
    return isTablet ? <div {...props}> {children} </div> : null
}

const SmallWrapper = ({children, props}) => {
    const isTablet = useMediaQuery({
        query: '(min-width: 769px) and (max-width: 1024px)',
    })
    return isTablet ? <div {...props}> {children} </div> : null
}

const LargeWrapper = ({children, props}) => {
    const isTablet = useMediaQuery({
        query: '(min-width: 1025px) and (max-width: 1200px)',
    })
    return isTablet ? <div {...props}> {children} </div> : null
}

const ExtraLargeWrapper = ({children, props}) => {
    const isTablet = useMediaQuery({
        query: '(min-width: 1201px)',
    })
    return isTablet ? <div {...props}> {children} </div> : null
}

const withMediaQuery = (WrappedComponent, selectSize) => {

    return (
        <>
            <MobileWrapper><WrappedComponent {...selectSize('mobile')}/></MobileWrapper>
            <TabletWrapper><WrappedComponent {...selectSize('tablet')}/></TabletWrapper>
            <SmallWrapper><WrappedComponent {...selectSize('small')}/></SmallWrapper>
            <LargeWrapper><WrappedComponent {...selectSize('large')}/></LargeWrapper>
            <ExtraLargeWrapper><WrappedComponent {...selectSize('extraLarge')}/></ExtraLargeWrapper>
        </>
    )
}

export default withMediaQuery