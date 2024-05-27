import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router';

function ProtectedRoutes() {
  const uid = useSelector(state => state.auth);
  return (
    <>
      {
        uid ? (
          <Outlet/>
        ) : (
          <Navigate to={'/login'}/>
        )
      }
    </>
  )
}

export default ProtectedRoutes