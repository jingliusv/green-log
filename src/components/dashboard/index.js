import React, { Component } from 'react';
import NoteList from '../notes/NoteList';
import { connect } from 'react-redux';
import GreetingBoard from './GreetingBoard';
import { startGetNotes } from '../../store/actions/notesAction';

class Dashboard extends Component {
    componentDidMount(){
        this.props.startGetNotes();
    }
    
    render() {
        const { notes } = this.props;

        return (
            <React.Fragment>
                <GreetingBoard username={this.props.username} pic={this.props.pic}/>
                <div className="container">
                    <div className="tile is-ancestor">
                        <div className="tile is-parent is-4">
                            
                        </div>
                        <NoteList notes={notes} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        notes: state.note.notes,
        username: state.user.username,
        pic: state.user.pic
    }
}

export default connect(mapStateToProps, {startGetNotes})(Dashboard);
