import { ROUTES } from '@constants/index'
import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    const auth = {'token':false}
  return (
    auth.token ? <Outlet/>:<Navigate to={ROUTES.LOGIN}/>
  )
}

export default PrivateRoute
