import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ContextProvider } from "./contexts/context";
import { SignIn, SignUp, Home } from "./pages";
import { AuthRoute } from "./utils/AuthRoute";

export class App extends React.Component {
    render() {
        return (
            <ContextProvider>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <AuthRoute exact path="/signup" component={SignUp} />
                        <AuthRoute exact path="/login" component={SignIn} />
                    </Switch>
                </Router>
            </ContextProvider>
        );
    }
}
