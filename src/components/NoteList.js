import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from "axios";
import { default as Table } from "./Table";
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export const NoteList = (props) => {
    const history = useHistory();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [noteList, setNoteList] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:4000/").then((response) => {
            setNoteList(response.data);
        });
    }, []);

    const addToList = async () => {
        await Axios.post("http://localhost:4000/", {
            title: title,
            content: content,
        });
        history.push("/");
    };

    return (
        <div className="container bg-light border border-3 rounded">
            <Form onSubmit={addToList}>
                <FormGroup row>
                    <Label for="title" sm={2}>Title:</Label>
                    <Col sm={10}>
                        <Input
                            
                            type="text"
                            name="title"
                            id="title"
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
                            placeholder="Content"
                            onChange={(event) => {
                                setContent(event.target.value);
                            }}
                        />
                    </Col>
                </FormGroup>
                <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                        <Button type="submit">Add Note</Button>
                    </Col>
                </FormGroup>
            </Form>

            <Table list={noteList} />
        </div>
    );
};