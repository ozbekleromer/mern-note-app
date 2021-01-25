import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { default as Table } from "./Table";

export const TrashBin = (props) => {
    const [binList, setBinList] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:4000/trashbin").then((response) => {
            setBinList(response.data);
        });
    }, []);

    return (
        <div className="container bg-light border border-3 rounded">
            <Table list={binList} isTrash={true}/>
        </div>
    );
};