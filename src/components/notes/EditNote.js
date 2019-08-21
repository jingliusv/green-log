import React from 'react';
import { connect } from 'react-redux';
import { startEditNote } from '../../store/actions/notesAction';

class EditNote extends React.Component {
    state = {
        title: this.props.selectedNote.title ? this.props.selectedNote.title : '',
        content: this.props.selectedNote.content ? this.props.selectedNote.content : ''
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.setState({ title: '', content: ''});
        this.props.startEditNote(this.props.match.params.id, this.state);
        this.props.history.push('/');
    }

    render(){
        const { title, content } = this.state;

        return (
            <div className="container">
                <section className="hero">
                    <div className="hero-body">
                        <h2 className="title is-4">Edit a Note</h2>
                        <h4 className="subtitle">Write down what's on your mind now</h4>
                    </div>
                </section>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Title</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input onChange={this.onInputChange} value={title} type="text" name="title" className="input" placeholder="Give your idea a title"/>
                            </div>
                        </div>
                    </div>               
                </div>
    
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Content</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <textarea onChange={this.onInputChange} value={content} className="textarea" name="content" placeholder="Write down your idea"></textarea>
                            </div>
                        </div>
                    </div>    
                </div>

                <div className="field is-horizontal">
                    <div className="field-label"></div>
                    <div className="field-body">
                        <div className="control">
                            <button onClick={this.onFormSubmit} className="button is-primary">
                                Update Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return{
        auth: state.user.auth,
        selectedNote: state.note.notes.find(note => note.id === ownProps.match.params.id)
    }
}

export default connect(mapStateToProps, { startEditNote })(EditNote);