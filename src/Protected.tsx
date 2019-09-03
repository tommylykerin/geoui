import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom';
import NoMatch from './components/NoMatch';
import Home from './pages/Home';

const Protected: React.FC = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <Redirect exact path="/home" to="/" />
                <Route exact path="/" component={Home} />
                <Route component={NoMatch} />
            </Switch>
        </BrowserRouter>
    );
}

export default Protected;
