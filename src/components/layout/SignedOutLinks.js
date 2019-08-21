import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
    return (
        <React.Fragment>
            <NavLink className="button is-primary" to="/signup"><strong>Sign Up</strong></NavLink>
            <NavLink className="button is-info" to="/signin"><strong>Sign In</strong></NavLink>
        </React.Fragment>
    );
};

export default SignedOutLinks;