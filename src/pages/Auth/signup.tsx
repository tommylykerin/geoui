import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { signupAction, signupErrorAction } from './actions'

const Signup = () => {
    const auth = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const signup = (name: string, email: string, password: string) => dispatch(signupAction(name, email, password));

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        signup(name, email, password);
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="signupName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" onChange={(e: any) => setName(e.target.value)} />
                </Form.Group>
                
                <Form.Group controlId="signupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e: any) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="signupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e: any) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" block>
                    <strong>{auth.signingUp? 'loading...' : 'SIGNUP'}</strong>
                </Button>
            </Form>
        </>
    )
}

export default Signup;