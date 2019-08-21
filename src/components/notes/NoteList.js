import React from 'react';
import NoteSummary from './NoteSummary';

const NoteList = ({notes}) => {
    return (
        <div className="tile is-8 is-vertical is-info">
            {
                notes.length > 0 ? notes.slice(0).reverse().map(note => (
                    <NoteSummary key={note.id} note={note} />
                ))
                : <div className="notification is-success">There is not any note here. Add one now!</div>
            }
        </div>       
    );
};

export default NoteList;