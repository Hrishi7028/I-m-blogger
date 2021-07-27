import axios from "axios";

export const postNameMethod = (user) => {
    return async (dispatch, getState) => {
        const { AuthReducer: { token } } = getState();
        // console.log(getState());
        // console.log(token);
        // console.log(typeof(name));
        dispatch({ type: 'ON_LOADING' })
        try {
            dispatch({ type: 'CLOSE_LOADING' })
            const response = await axios.post('http://localhost:80/edit_name', user, {
                headers: {
                    'Authorization': `Bearer ${ token }`
                }
            })

            console.log(response.data.msg);
            localStorage.setItem('User_key', response.data.token)
            dispatch({ type: 'SET_USER', payload: response.data.token })
            dispatch({ type: 'SET_MESSAGE', payload: response.data.msg })
            dispatch({ type: 'REDIRECT_TRUE' })

        } catch (error) {
            dispatch({ type: 'CLOSE_LOADING' })
            dispatch({ type: 'SET_PROFILE_ERROR', payload: error.response.data.errors })
            console.log(error.response.data.errors);
            dispatch({ type: 'REMOVE_PROFILE_ERROR' })
        }
    }
}

export const postPasswordMethod = (user) => {
    return async (dispatch, getState) => {
        console.log(user);
        dispatch({ type: 'ON_LOADING' })
        const { AuthReducer: { token } } = getState();
        console.log(token);
        try {
            const response = await axios.post(`http://localhost:80/change_password`, user, {
                headers: {
                    'Authorization': `Bearer ${ token }`
                }
            })
            console.log(response);
            dispatch({ type: 'SET_MESSAGE', payload: response.data.msg })
            dispatch({ type: 'CLOSE_LOADING' })
            dispatch({type:'REDIRECT_TRUE'})
            // dispatch({ type:'REMOVE_MESSAGE'})

        } catch (error) {
            dispatch({ type: 'CLOSE_LOADING' })
            dispatch({ type: 'SET_PROFILE_ERROR', payload: error.response.data.errors })
            console.log(error.response.data.errors);
            dispatch({ type: 'REMOVE_PROFILE_ERROR' })
        }
    }
}