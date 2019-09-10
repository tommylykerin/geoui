import React from 'react';
import { BrowserRouter, Route, Redirect, Switch, Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

import Login from './login';
import Signup from './signup';

const Auth: React.FC = () => {
    const auth = useSelector((state: any) => state.auth);
    if (auth.loggedIn === true) {
        return <Redirect to="/home" />
    }

    return (
        <>
            <Row className="justify-content-end">
                <Col xs={12} lg={4}>
                    <div className="mt-5 mr-5 shadow-sm">
                        <Nav justify variant="tabs">
                            <Nav.Item>
                                <NavLink className="nav-link" activeClassName="active" to="/login">Login</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink className="nav-link" activeClassName="active" to="/signup">Signup</NavLink>
                            </Nav.Item>
                        </Nav>
                        <div className="p-4 border border-top-0">
                            <Switch>
                                <Route path="/login" component={Login} />
                                <Route path="/signup" component={Signup} />
                            </Switch>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default Auth;