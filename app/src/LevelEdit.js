import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

const LevelEdit = () => {
    const initialFormState = {
        name: '',
        description: '',
    };
    const [level, setLevel] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id !== 'new') {
            fetch(`/api/level/${id}`)
                .then(response => response.json())
                .then(data => setLevel(data));
        }
    }, [id, setLevel]);

    const handleChange = (event) => {
        const { name, value } = event.target

        setLevel({ ...level, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        await fetch(`/api/level${level.id ? `/${level.id}` : '/'}`, {
            method: (level.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(level)
        });
        setLevel(initialFormState);
        navigate('/levels');
    }

    const title = <h2>{level.id ? 'Edit Level' : 'Create Level'}</h2>;

    return (
        <>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={level.name || ''}
                               onChange={handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="text" name="description" id="description" value={level.description || ''}
                               onChange={handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>
                        <Button color="secondary" tag={Link} to="/levels">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </>
    )
};

export default LevelEdit;