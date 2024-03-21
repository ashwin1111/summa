import React from "react"
import { useLocation,Navigate } from "react-router-dom"

export const fetchToken = (token)=>{

    return localStorage.getItem('token')
}

export function RequireToken({children}){

    let auth = fetchToken()
    let location = useLocation()

    if(!auth){

        return(<Navigate to='/' state ={{from : location}} />);
    }

    return children;
}