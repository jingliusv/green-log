import firebase from '../../firebase/firebase';

export const getUser = (id, username, pic) => {
    return{
        type: 'GET_USER',
        uid: id,
        username,
        pic
    }
}

export const clearUser = () => {
    return {
        type: 'CLEAR_USER'
    }
}

export const startClearUser = () => {
    return(dispatch) => {
        return firebase.auth().signOut().then(() => {
            dispatch(clearUser());
        });
    }
}

