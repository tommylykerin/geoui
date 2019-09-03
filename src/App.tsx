import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus, faCoffee } from '@fortawesome/free-solid-svg-icons';
import NoMatch from './components/NoMatch';
import Auth from './pages/Auth';
import Protected from './Protected';
import CustomAlert from './components/CustomAlert';

import { hydrateAction, logoutAction } from './pages/Auth/actions';


library.add(faPlus, faCoffee)

const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hydrateAction());
    }, [])

    const auth = useSelector((state: any) => state.auth);
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <>
                <Navbar bg="light" expand="lg" className="shadow-sm">
                    <Navbar.Brand href="/">GeoUI</Navbar.Brand>
                    <Nav className="ml-auto">
                    {
                        auth.loggedIn && <Nav.Link className="nav-link" onClick={() => dispatch(logoutAction())}>Logout</Nav.Link>
                    }
                    </Nav>
                </Navbar>
                {
                    auth.loginError && <CustomAlert type="danger">{auth.loginError}</CustomAlert>
                }
                {
                    auth.signupError && <CustomAlert type="danger">{auth.signupError}</CustomAlert>
                }
            </>
            <Container fluid className="py-5">
                <Switch>
                    <Redirect exact path="/home" to="/" />
                    <Route exact path="/" component={Protected} />
                    <Route path="/login" component={Auth} />
                    <Route path="/signup" component={Auth} />
                    <Route path="/logout" component={Auth} />
                    <Route component={NoMatch} />
                </Switch>
            </Container>
        </BrowserRouter>
    );
}

export default App;
