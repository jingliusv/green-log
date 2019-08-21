import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startDeleteNote } from '../../store/actions/notesAction';

const NoteSummary = (props) => {
    const {note} = props;
    return (
        <div className="tile is-child">           
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">{note.title}</p>
                </header>

                <div className="card-content">
                    <div className="content">{note.content}</div>

                    <div className="field is-grouped is-grouped-right">
                        <div className="control">
                            <Link to={`/edit/${note.id}`}>
                                <button className="button is-link is-inverted">
                                    <span className="icon is-small">
                                        <i className="fas fa-edit"></i>
                                    </span>
                                    <span>Edit</span>
                                </button> 
                            </Link>                           
                        </div>
                        <div className="control">
                            <button onClick={() => props.startDeleteNote(note.id)} className="button is-danger is-inverted">
                                <span className="icon is-small">
                                    <i className="fas fa-trash-alt"></i>
                                </span>
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(null, {startDeleteNote})(NoteSummary);