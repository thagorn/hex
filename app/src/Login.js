import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const Login = () => {
    const params = new URLSearchParams(window.location.search)
    const error = params.get('error')
    const initialFormState = {
        username: params.get('username') || '',
        password: '',
    };
    const [user, setUser] = useState(initialFormState);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target

        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target)

        await fetch(`/api/perform_login`, {
            method: 'POST',
            body: new URLSearchParams(data)
        }).then(v => {
            if(v.redirected) window.location = v.url
        }).catch(e => console.warn(e))
    }

    return (
        <>
            <AppNavbar/>
            <Container>
                <h2>Log in</h2>
                <Link to="/signup">Create an Account</Link>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" id="username" value={user.username || ''}
                            onChange={handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" value={user.password || ''}
                            onChange={handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Submit</Button>
                    </FormGroup>
                    <div className="error">{error}</div>
                </Form>
            </Container>
        </>
    )
};

export default Login;
