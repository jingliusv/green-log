import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../../store/actions/authAction'
import firebase from '../../firebase/firebase'

class SignIn extends Component {
    state = {
        email: '',
        password: '',
        error: ''
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    showErrorMsg = () => {
        const { error } = this.state;
        return(
            error && <div className="field"><p className="help is-danger">{error}</p></div>
        )
    }


    onFormSubmit = (e) => {
        const { email, password } = this.state

        e.preventDefault();

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(signedInUser => {
                console.log(signedInUser.user.uid)
            })
            .catch(err => {
                this.setState({ error: err.message });
                setTimeout(() => { this.setState({ error: '' }) }, 3000);
            })
    }

    render() {

        return (
            <section>
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h2 className="title">Welcome back to GreenLog</h2>
                        <h5 className="subtitle">We're happy to see you here, log in and start a new log today</h5>
                    </div>
                </div> 
                <div className="columns is-mobile">
                    <div className="column is-4 is-offset-4">   
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control has-icons-left">
                                <input onChange={this.onInputChange} type="email" className="input" name="email" placeholder="Your email"/>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-envelope"></i>
                                </span>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control has-icons-left">
                                <input onChange={this.onInputChange} type="password" className="input" name="password" placeholder="Your password"/>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </div>
                        </div>

                        { this.showErrorMsg() }

                        <div className="field">
                            <button onClick={this.onFormSubmit} className="button is-info">Sign In</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        uid: state.user.uid
    }
}


export default connect(mapStateToProps, { getUser })(SignIn);