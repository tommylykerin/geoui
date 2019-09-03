import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { loginAction } from './actions'

const Login = () => {
    const auth = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const login = (email: string, password: string) => dispatch(loginAction(email, password));

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        login(email, password);
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="loginEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"
                        value={email} onChange={(e: any) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="loginPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                        value={password} onChange={(e: any) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" block>
                    <strong>{auth.loggingIn? 'loading...' : 'LOGIN'}</strong>
                </Button>
            </Form>
        </>
    )
}

export default Login;