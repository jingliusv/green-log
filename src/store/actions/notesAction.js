import firebase from '../../firebase/firebase'

export const getNotes = (notes) => {
    return{
        type: 'GET_NOTES',
        notes
    }
}

export const startGetNotes = () => {
    return (dispatch, getState) => {
        const uid = getState().user.uid;
        return firebase.database().ref(`users/${uid}/notes`).once('value').then((snapshot) => {
            const notes = [];

            snapshot.forEach((childSnapshot) => {
                notes.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })

            dispatch(getNotes(notes));
        })
    }
}

export const createNote = (note) => {
    return {
        type: 'CREATE_NOTE',
        note: note
    }
}

export const startCreateNote = (noteData = {}) => {
    return(dispatch, getState) => {
        const uid = getState().user.uid;
        const { title, content } = noteData;

        const note =  { title, content };
        return firebase.database().ref(`users/${uid}/notes`).push(note).then((ref) => {
            dispatch(createNote({
                id: ref.key,
                ...note
            }))
        })
    }
}

export const createNoteError = () => {
    return {
        type: 'CREATE_NOTE_ERROR'
    }
}

export const clearError = () => {
    return{
        type: 'CLEAR_ERROR'
    }
}

export const editNote = (id, newNote) => {
    return {
        type: 'EDIT_NOTE',
        id,
        newNote
    }
}

export const startEditNote = (id, newNote) => {
    return ( dispatch, getState) => {
        const uid = getState().user.uid;
        return  firebase.database().ref(`users/${uid}/notes/${id}`).update(newNote).then(() => {
            dispatch(editNote(id, newNote));
        })
    }
}

export const deleteNote = (id) => {
    return{
        type: 'DELETE_NOTE',
        id
    }
}

export const startDeleteNote = (id) => {
    return(dispatch, getState) => {
        const uid = getState().user.uid;
        return firebase.database().ref(`users/${uid}/notes/${id}`).remove().then(() => {
            dispatch(deleteNote(id));
        })
    }
}