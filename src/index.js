import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import notesReducer from './store/reducers/notesReducer';
import authReducer from './store/reducers/authReducer';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

const rootReducer = combineReducers({
    note: notesReducer,
    user: authReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>, 
    document.getElementById('root')
);