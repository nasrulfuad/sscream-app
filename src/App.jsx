import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import UserContextProvider from "./contexts/user/context";
import GlobalContextProvider from "./contexts/global/context";
import { SignUp, Home, SignIn } from "./pages";

function App() {
    return (
        <UserContextProvider>
            <GlobalContextProvider>
                <Router>
                    <Switch>
                        <Route path="/signup" component={SignUp} />
                        <Route path="/login" component={SignIn} />
                        <Route path="/" component={Home} />
                    </Switch>
                </Router>
            </GlobalContextProvider>
        </UserContextProvider>
    );
}

export default App;
