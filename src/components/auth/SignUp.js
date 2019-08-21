import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import firebase from '../../firebase/firebase'
import md5 from 'md5'
import { getUser } from '../../store/actions/authAction'

class SignUp extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
        error: '',
        usersRef: firebase.database().ref('users')
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    checkPasswordValid = () => {
        const { password, repeatPassword } = this.state;
        if(password !== repeatPassword){
            this.setState({ error: "Password doesn't match."})
            setTimeout(() => {
                this.setState({ error: '' })
            }, 3000)
            return false;
        } else {
            return true;
        }
    }

    showErrorMsg = () => {
        const { error } = this.state;
        return(
            error && <div className="field"><p className="help is-danger">{error}</p></div>
        )
    }

    onFormSubmit = (e) => {
        const { username, email, password } = this.state;

        e.preventDefault();
        if(this.checkPasswordValid()){
            // console.log(this.state);
            this.setState({ error: '' })

            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then( createdUser => {
                    // console.log(createdUser)
                    createdUser.user.updateProfile({
                        displayName: username,
                        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon` 
                    })
                    .then(() => {
                        this.saveUser(createdUser).then(() => {
                            const {uid, displayName, photoURL} = createdUser.user;
                            this.props.getUser(uid, displayName, photoURL);
                        })
                    })
                    .catch(err => {
                        this.setState({ error: err.message });
                    })
                })
                .catch(err => {
                    this.setState({ error: err.message });
                })
        }
    }

    saveUser = createdUser => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        })
    }

    render() {
        const { auth } = this.props;

        if(auth) return <Redirect to="/" />

        return (
            <React.Fragment>
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <h2 className="title">Welcome To GreenLog</h2>
                        <h5 className="subtitle">Here you can log every inspiration in your mind</h5>
                    </div>
                </div> 

                <div className="container">
                    <div className="columns is-desktop">
                        <div className="column is-4 is-offset-4">
                            <div className="field">
                                <label className="label">Username</label>
                                <div className="control has-icons-left">
                                    <input onChange={this.onInputChange} type="text" className="input" name="username" placeholder="Your username"/>
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                    </span>
                                </div>
                            </div>

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

                            <div className="field">
                                <label className="label">Confirm Password</label>
                                <div className="control has-icons-left">
                                    <input onChange={this.onInputChange} type="password" className="input" name="repeatPassword" placeholder="Confirm password"/>
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-lock"></i>
                                    </span>
                                </div>
                            </div>
                    
                            { this.showErrorMsg() }

                            <div className="field">
                                <button onClick={this.onFormSubmit} className="button is-info">Sign Up</button>      
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        auth: state.user.auth
    }
}

export default connect(mapStateToProps, {getUser})(SignUp);
