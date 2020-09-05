import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from '../contexts';

export class AuthRoute extends React.Component {
    static contextType = Context;

    render() {
        const { component: Component, ...rest} = this.props;
        const { authenticated } = this.context.store;

        return (
            <Route
                {...rest}
                render={props => authenticated === true
                    ? <Redirect to="/" />
                    : <Component {...props} />
                }
            />
        )
    }
}
