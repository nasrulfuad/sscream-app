import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ContextProvider } from "./contexts/context.jsx";
import { SignIn, SignUp, Home, EditProfile } from "./pages";
import { AuthRoute } from "./utils/AuthRoute";
import { AuthenticatedRoute } from "./utils/AuthenticatedRoute";
import "./styles/App.css";

export class App extends React.Component {
    render() {
        return (
            <ContextProvider>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <AuthenticatedRoute exact path="/profile" component={EditProfile} />
                        <AuthRoute exact path="/signup" component={SignUp} />
                        <AuthRoute exact path="/login" component={SignIn} />
                    </Switch>
                </Router>
            </ContextProvider>
        );
    }
}
