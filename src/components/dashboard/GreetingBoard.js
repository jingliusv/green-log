import React from 'react';
import { connect } from 'react-redux';

const GreetingBoard = ({username, pic}) => {   
    const timeGreeting = () => {
        const d = new Date();
        const time = d.getHours();
        if(time <= 12){
            return 'Good Morning';
        } else if( time > 12 && time <= 18) {
            return 'Good Afternoon';
        } else if( time > 18){
            return 'Good Evening';
        }
    }

    return (
        <div className="hero">
            <div className="hero-body">
                <div className="container">
                    <div className="columns">
                        <div className="column is-2">
                            <figure className="image">
                                <img src={pic && pic} alt="avatar" className="is-rounded icon is-medium"/>
                            </figure>
                        </div>
                        <div className="column is-10">
                            <h3 className="title">{timeGreeting()} {username ? username : 'user'}!</h3>
                            <h5 className="subtitle">What's on your mind today?</h5>
                        </div>
                    </div> 
                    
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return{
        uid: state.user.uid
    }
}

export default connect(mapStateToProps)(GreetingBoard);