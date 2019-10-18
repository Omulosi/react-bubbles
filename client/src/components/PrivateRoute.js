import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context';

export const PrivateRoute = (props) => {
  const [isAuthenticated] = useContext(AuthContext);
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={props => {
        return (isAuthenticated? (
          <Component {...props} />
        ): (
          <Redirect to={{pathname: '/login', state: {referer: props.location}}} />
        )
      )}}
    />
  );
}
