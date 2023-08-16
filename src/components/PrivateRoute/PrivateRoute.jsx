import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { selectAuthentificated } from 'redux/authSlice';

const PrivateRoute = ({ children, redirectTo = '/' }) => {
  const authentificated = useSelector(selectAuthentificated);

  return authentificated ? children : <Navigate to={redirectTo} />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string,
};

export default PrivateRoute;
