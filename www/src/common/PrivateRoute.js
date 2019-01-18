
import { Route, Redirect } from 'react-router';
import React from 'react';
import _ from 'lodash';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (global.isSignedIn) {
                    return (
                        <Component {...props} />
                    )
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/signin"
                            }}
                        />
                    )
                }
            }
            }
        />
    );
}

export default PrivateRoute;