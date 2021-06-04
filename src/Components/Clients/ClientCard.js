import React from 'react'
import styled from '@emotion/styled'

const ClientCard = ({ data }) => {
    const {
        client_id,
        username,
        lastActive,
        os,
        public_ip,
        isAdmin,
        isConnected
    } = data
    return (
        <CardWrapper isConnected={isConnected}>
            <Field><Label>client id: </Label>{client_id}</Field>
            <Field><Label>username: </Label>{username}</Field>
            <Field><Label>last active: </Label>{lastActive}</Field>
            <Field><Label>os: </Label>{os}</Field>
            <Field><Label>public ip: </Label>{public_ip}</Field>
            <Field><Label>is admin: </Label>{isAdmin}</Field>
        </CardWrapper>
    )
}

export default ClientCard

const CardWrapper = styled.div`
    border: 1px solid ${({ isConnected, theme }) => isConnected ? theme.colors.primary: 'red'};
    background: #fefefe;
    border-radius: 5px;
`

const Field = styled.div`
    display: flex;
`

const Label = styled.label`
    text-transform: uppercase;
    font-weight: 600;
`