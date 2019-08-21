import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { connect } from 'react-redux';

const Navbar = ({uid}) => {
    const showLinks = () => {
        return(
            uid !== '' ? <SignedInLinks /> : <SignedOutLinks />
        )
    }

    return (
        <nav className="navbar has-shadow is-spaced is-light">
            <div className="container">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/"><span className="icon is-large has-text-info"><i className="fas fa-clipboard"></i></span><strong className="title is-4">GreenLog</strong></Link>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {showLinks()}                            
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

const mapStateToProps = (state) => {
    return{
        uid: state.user.uid
    }
}

export default connect(mapStateToProps)(Navbar);