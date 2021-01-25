import React, { useState, useEffect } from 'react';
import { useRouteMatch } from "react-router-dom";
import Axios from "axios";
import { Table } from 'reactstrap';

export const ReadNote = (isTrash) => {
    const match = useRouteMatch();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [modified, setModified] = useState('');
    const [versions, setVersions] = useState([]);

    useEffect(() => {
        const fetchTodo = async () => {
            const id = match.params.id;
            let response = await Axios.get(`http://localhost:4000/note/${id}`);
            if(response.data === null) {
                response = await Axios.get(`http://localhost:4000/trashbin/${id}`);
            }
            setTitle(response.data.title);
            setContent(response.data.content);
            setModified(response.data.modified);
            setVersions(response.data.versions);
        };
        fetchTodo();
    }, [match.params.id]);

    return (
        <div className="container bg-light border border-3 rounded">

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
                    {
                        <tr key={versions.length}>
                            <th scope="row">{versions.length+1}</th>
                            <td>{title}</td>
                            <td>{content}</td>
                            <td>{modified}</td>
                        </tr>
                    }
                </tbody>
            </Table>
        </div>
    );
};