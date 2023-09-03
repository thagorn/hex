import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

const LevelList = () => {

    const [levels, setLevels] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch('api/level/')
            .then(response => response.json())
            .then(data => {
                setLevels(data);
                setLoading(false);
            })
    }, []);

    const remove = async (id) => {
        await fetch(`/api/level/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedLevels = [...levels].filter(i => i.id !== id);
            setLevels(updatedLevels);
        });
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    const levelList = levels.map(level => {
        return <tr key={level.id}>
            <td style={{whiteSpace: 'nowrap'}}>{level.name}</td>
            <td>{level.description}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/levels/" + level.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(level.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <>
            <AppNavbar/>
            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/levels/new">Add Level</Button>
                </div>
                <h3>My Level</h3>
                <Table className="mt-4">
                    <thead>
                    <tr>
                        <th width="20%">Name</th>
                        <th width="20%">Description</th>
                        <th width="10%">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {levelList}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default LevelList;