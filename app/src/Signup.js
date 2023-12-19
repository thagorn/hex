import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const Signup = () => {
    const initialFormState = {
        username: '',
        email: '',
        password: '',
        confirm_password: ''
    };
    const [user, setUser] = useState(initialFormState);
    const params = new URLSearchParams(window.location.search)
    const [error, setError] = useState(params.get('error'));
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target

        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let validation_error = validationErrors()
        if (validation_error) {
            setError(validation_error)
            return
        }
        const data = JSON.stringify(user)

        await fetch(`/api/user/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        }).then(v => {
            return v.json()
        }).then(data => {
            if (data.success) {
                window.location = '/login?username=' + user.username
            } else {
                setError(data.message)
            }
        }).catch(e => console.warn(e))
    }
    const validationErrors = () => {
        if (user.password !== user.confirm_password) {
            return 'Password and confirmation did not match'
        }

        return false
    }

    return (
        <>
            <AppNavbar/>
            <Container>
                <h2>Sign Up</h2>
                <Link to="/login">Already Have an Account</Link>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" id="username" value={user.username || ''}
                            onChange={handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" id="email" value={user.email || ''}
                            onChange={handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" value={user.password || ''}
                            onChange={handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirm_password">Confirm Password</Label>
                        <Input type="password" name="confirm_password" id="confirm_password" value={user.confirm_password || ''}
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

export default Signup;
