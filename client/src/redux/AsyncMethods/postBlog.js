import axios from "axios"

export const postBlog = (formData) => {
    return async (dispatch, getState) => {

        const { AuthReducer: { token } } = getState()
        dispatch({ type: 'ON_LOADING' })
        try {
            const response = await axios.post('/create_post', formData, {
                headers: {
                    'Authorization': `Bearer ${ token }`
                }
            })
            dispatch({ type: 'CLOSE_LOADING' });
            dispatch({ type: 'SET_MESSAGE', payload: response.data.msg })
            dispatch({ type: 'REDIRECT_TRUE' })
            console.log(response.data);

        } catch (error) {
            console.log(error.response.data.errors);
            dispatch({ type: 'CLOSE_LOADING' })
            dispatch({ type: 'POST_ERRORS', payload: error.response.data.errors })
            dispatch({ type: 'REMOVE_ERRORS' })
        }
    }
}