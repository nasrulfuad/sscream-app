import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from '../contexts';

export class AuthenticatedRoute extends React.Component {
    static contextType = Context;

    render() {
        const { component: Component, ...rest} = this.props;
        const { authenticated } = this.context.store;

        return (
            <Route
                {...rest}
                render={props => authenticated === false
                    ? <Redirect to="/profile" />
                    : <Component {...props} />
                }
            />
        )
    }
}
