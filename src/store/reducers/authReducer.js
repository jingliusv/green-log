const initialState = {
    uid: '',
    username: '',
    pic: ''
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_USER':
            return{
                ...state,
                uid: action.uid,
                username: action.username,
                pic: action.pic
            }
        case 'CLEAR_USER':
            return{
                ...state,
                uid: ''
            }
        default:
            return state;
    }
}

export default authReducer;