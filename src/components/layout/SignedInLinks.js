import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startClearUser } from '../../store/actions/authAction';

const SignedInLinks = (props) => {
    return (
        <React.Fragment>
            <NavLink className="button is-link" to="/create"><strong>Add New Note</strong></NavLink>
            <button onClick={() => props.startClearUser()} className="button is-danger"><strong>Sign Out</strong></button>
        </React.Fragment>
    );
};

export default connect(null, {startClearUser})(SignedInLinks);