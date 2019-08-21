import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Dashboard from './components/dashboard';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CreateNote from './components/notes/CreateNote';
import EditNote from './components/notes/EditNote';
import NotFound from './components/layout/NotFound';
import firebase from './firebase/firebase';
import { getUser, clearUser } from './store/actions/authAction';
import { startGetNotes } from './store/actions/notesAction';


class App extends React.Component {
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.props.getUser(user.uid, user.displayName, user.photoURL);
                this.props.startGetNotes();
                this.props.history.push("/");
            } else {
                this.props.clearUser();
                this.props.history.push("/signin");
            }
        })
    }

    render(){
        return (
            <React.Fragment>            
                <div className="content">
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <Route path="/create" component={CreateNote} />
                        <Route path="/signin" component={SignIn} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/edit/:id" component={EditNote} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
                <Footer />
            </React.Fragment>
        );
    }
};

export default withRouter(connect(null, {getUser, clearUser, startGetNotes})(App));
