import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import propTypes from 'prop-types';

const AdminRouter = ({ isAuthentication, isAdmin }) => {
    return isAuthentication && isAdmin === 'admin' ? <Outlet /> : <Navigate to="/home" />;
  };

AdminRouter.propTypes = { isAuthentication: propTypes.bool , isAdmin: propTypes.string };
export default AdminRouter;
