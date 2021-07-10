import axios from "axios"


const token = localStorage.getItem('User_key')
export const postBlog = (formData) => {
    return async (dispatch) => {
        dispatch({ type: 'ON_LOADING'})
        try {
            const response = await axios.post('http://localhost:80/create_post', formData, {
                headers: {
                    'Authorization': `Bearer ${ token }`
                }
            })
            dispatch({ type: 'CLOSE_LOADING'})
            console.log(response.data);
            
        } catch (error) {
            console.log(error.response);
            dispatch({ type:'POST_ERRORS',payload: error.response.data.errors})
            dispatch({ type: 'CLOSE_LOADING'})
        }
    }
}