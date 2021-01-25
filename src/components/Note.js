import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from "react-router-dom";
import Axios from "axios";
import { Col, Button, Form, FormGroup, Label, Input, Table, Row } from 'reactstrap';

export const Note = () => {
    const match = useRouteMatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [created, setCreated] = useState('');
    const [modified, setModified] = useState('');
    const [versions, setVersions] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchTodo = async () => {
            const id = match.params.id;
            const response = await Axios.get(`http://localhost:4000/note/${id}`);
            setTitle(response.data.title);
            setContent(response.data.content);
            setCreated(response.data.created);
            setModified(response.data.modified);
            setVersions(response.data.versions);
        };
        fetchTodo();
    }, [match.params.id]);

    const updateNote = async () => {
        const id = match.params.id;
        await Axios.post(`http://localhost:4000/note/${id}`, {
            title: title,
            content: content,
        });
    };

  const deleteNote = async () => {
    const id = match.params.id;
    await Axios.delete(`http://localhost:4000/${id}`);
    history.push("/");
  };

    return (
        <div className="container bg-light border border-3 rounded">
            <Form onSubmit={updateNote}>
                <FormGroup row>
                    <Label for="title" sm={2}>Title:</Label>
                    <Col sm={10}>
                        <Input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            placeholder="Title of the note"
                            onChange={(event) => {
                                setTitle(event.target.value);
                            }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="content" sm={2}>Note Content:</Label>
                    <Col sm={10}>
                        <Input
                            required
                            type="textarea"
                            name="content"
                            id="content"
                            value={content}
                            placeholder="Content"
                            onChange={(event) => {
                                setContent(event.target.value);
                            }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="created" sm={2}>Creation Date:</Label>
                    <Col sm={10}>
                        <Input
                            readOnly
                            type="text"
                            name="created"
                            id="created"
                            value={created}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="modified" sm={2}>Modification Date:</Label>
                    <Col sm={10}>
                        <Input
                            readOnly
                            type="text"
                            name="modified"
                            id="modified"
                            value={modified}
                        />
                    </Col>
                </FormGroup>
                <Row>
                    <FormGroup check>
                        <Col>
                            <Button className="btn btn-primary" type="submit">Change Note</Button>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col>
                            <Button className="btn btn-danger" onClick={deleteNote} >Delete Note</Button>
                        </Col>
                    </FormGroup>
                </Row>
            </Form>

            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Date of Modification</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        versions.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <th scope="row">{key + 1}</th>
                                    <td>{val.title}</td>
                                    <td>{val.content}</td>
                                    <td>{val.modified}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
};