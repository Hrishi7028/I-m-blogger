import axios from 'axios';


export const allUposts = (page) => {
    return async (dispatch) => {
        dispatch({ type: 'ON_LOADING' });
        try {
            const { data: { posts, count, per_page_post } } = await axios.get(`/home/${ page }`);
            // console.log(posts, count, per_page_post);
            dispatch({ type: 'SET_POSTS', payload: { posts, count, per_page_post } })
            dispatch({ type: 'CLOSE_LOADING' });
            // console.log(posts, count, per_page_post);

        } catch (error) {
            dispatch({ type: 'CLOSE_LOADING' });
            // console.log(error.response);
        }

    }
}

export const fetchAllPost = (id, page) => {
    return async (dispatch, getState) => {
        console.log('called');
        const { AuthReducer: { token } } = getState()
        dispatch({ type: 'ON_LOADING' });
        try {

            const { data: { posts, count, per_page_post } } = await axios.get(`/get_all_posts/${ id }/${ page }`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            })
            dispatch({ type: 'CLOSE_LOADING' });
            console.log(posts, count, per_page_post);
            dispatch({ type: 'SET_POSTS', payload: { posts, count, per_page_post } })

        } catch (error) {
            dispatch({ type: 'CLOSE_LOADING' });
            console.log(error);

        }

    }
}

export const singlePost = (id) => {
    return async (dispatch) => {
        dispatch({ type: 'ON_LOADING' })
        try {
            const response = await axios.get(`/explore/${ id }`)
            console.log(response.data.post);
            dispatch({ type: 'SHOW_USER_POST', payload: response.data.post })
            dispatch({ type: 'CLOSE_LOADING' })
            // setTimeout(() => dispatch({ type: 'CLOSE_LOADING' }), 10000)

            // dispatch({ type: ''})
        } catch (error) {
            console.log(error);
            dispatch({ type: 'CLOSE_LOADING' })
        }
    }
}