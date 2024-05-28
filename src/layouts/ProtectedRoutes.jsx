import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router';

function ProtectedRoutes() {
  const uid = useSelector(state => state.auth);
  const location = useLocation();
  return (
    <>
      {
        uid ? (
          <Outlet/>
        ) : (
          <Navigate state={{from: location.pathname}} to={'/login'}/>
        )
      }
    </>
  )
}

export default ProtectedRoutes