import React from 'react';
import { connect } from 'react-redux';
import { startCreateNote, createNoteError, clearError } from '../../store/actions/notesAction';

class CreateNote extends React.Component {
    state = {
        title: '',
        content: '',
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    checkValidation = () => {
        const { title, content } = this.state;
        if(title && content){
            return true;
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        if(this.checkValidation()){
            this.props.startCreateNote(this.state);
            this.setState({ title: '', content: ''});
            this.props.history.push("/");
        } else {
            this.props.createNoteError();
            setTimeout(this.props.clearError, 3000);
        }
    }

    render(){
        const { title, content } = this.state;

        return (
            <div className="container">
                <section className="hero">
                    <div className="hero-body">
                        <h2 className="title is-4">Create a Note</h2>
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
                           {this.props.error && <p className="help is-danger">{this.props.error}</p>}
                        </div>
                    </div>
                </div>s

                <div className="field is-horizontal">
                    <div className="field-label"></div>
                    <div className="field-body">
                        <div className="control">
                           {this.props.error && <p className="help is-danger"></p>}
                        </div>
                        <div className="control">
                            <button onClick={this.onFormSubmit} className="button is-primary">
                                Create Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return{
        auth: state.user.auth,
        error: state.note.error
    }
}

export default connect(mapStateToProps, {startCreateNote, createNoteError, clearError})(CreateNote);