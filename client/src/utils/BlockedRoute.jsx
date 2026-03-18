import React from 'react'
import { Navigate } from 'react-router-dom'

export default function BlockedRoute({ children }) {
    const verify = localStorage.getItem("verify") 
    if (!verify)
        return <Navigate to="/login" />
    else 
        return children
}
