const initialState = {
    notes: [],
    error: ''
}

const notesReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_NOTES':
            return {
                notes: action.notes
            }
        case 'CREATE_NOTE':
            return {
                notes: state.notes.concat(action.note)                      
            }
        case 'CREATE_NOTE_ERROR':
            return{
                ...state,
                error: 'Please fill in all the inputs.'
            }
        case 'CLEAR_ERROR':
            return{
                ...state,
                error: ''
            }
        case 'EDIT_NOTE':
            return {
                notes: state.notes.map(note => {
                    if(note.id !== action.id){
                        return note;
                    }

                    return {
                        ...note,
                        ...action.newNote
                    }
                })
            }
        case 'DELETE_NOTE':
            return{
                notes: state.notes.filter(note => note.id !== action.id)
            }
        default:
            return state;
    }
}

export default notesReducer;