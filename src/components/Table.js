import React from 'react';
import { useHistory } from 'react-router-dom';
import { Table } from 'reactstrap';
import Axios from "axios";

const MyTable = (props) => {
  const history = useHistory();

  const deleteNote = async (id) => {
    await Axios.delete(`http://localhost:4000/${id}`);
    history.push("/");
    window.location.reload(false);
  };

  const restoreNote = async (id) => {
    await Axios.delete(`http://localhost:4000/trashbin/${id}`);
    history.push("/");
    window.location.reload(false);
  };

  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Content</th>
          {props.isTrash ? null : <th>Edit</th>}
          {props.isTrash ? <th>Restore</th> : <th>Delete</th>} 
        </tr>
      </thead>
      <tbody>
        {
          props.list.map((val, key) => {
            return (
              <tr key={val._id}>
                <th scope="row">{key + 1}</th>
                <td><a href={"/readnote/" + val._id} className="" > {val.title} </a> </td>
                <td>{val.content}</td>
                {props.isTrash ? null : <td> <a href={"/note/" + val._id} type="button" className="btn btn-primary" >Edit</a></td>}
                {props.isTrash ? 
                <td><button onClick={() => restoreNote(val._id)} type="button" className="btn btn-warning" >Restore</button> </td> : 
                <td><button onClick={() => deleteNote(val._id)} type="button" className="btn btn-danger" >Delete</button></td>}
              </tr>
            );
          })
        }
      </tbody>
    </Table>
  );
}

export default MyTable;