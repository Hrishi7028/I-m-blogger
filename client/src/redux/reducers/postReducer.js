const initialState = {
    loading:false,
    postErrors:[]
}

const postReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'ON_LOADING':
            return {...state,loading:true}
        
        case 'OFF_LOADING':
            return {...state,loading:false}
    
        case 'POST_ERRORS':
            return {...state,postErrors: action.payload}
            default:
            break;
    }
    return state;
}

export default postReducer;