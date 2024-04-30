import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import propTypes from 'prop-types';
const PrivateRouter = ({ isAuthentication }) => {
  return <div>{isAuthentication ? <Outlet /> : <Navigate to="/" />}</div>;
};
PrivateRouter.propTypes = { isAuthentication: propTypes.bool };
export default PrivateRouter;
