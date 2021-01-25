import React from 'react';
import './app.css';
import { default as Navbar } from "./components/Navbar";
import { Note } from './components/Note';
import { ReadNote } from './components/ReadNote';
import { NoteList } from './components/NoteList';
import { TrashBin } from './components/TrashBin';
import { Route, Switch } from 'react-router-dom';

function App() {
    return (
        <div>
            <Navbar />

            <Switch>
                <Route exact path="/" component={NoteList} />
                <Route exact path="/trashbin" component={TrashBin} />
                <Route exact path="/note/:id" component={Note} />
                <Route exact path="/readnote/:id" component={ReadNote} />
            </Switch>
        </div>
    );
}

export default App;