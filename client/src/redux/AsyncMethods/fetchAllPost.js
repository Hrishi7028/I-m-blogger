import axios from 'axios';

export const fetchAllPost = (id, page) => {
    return async (dispatch, getState) => {
        console.log('called');
        const { AuthReducer: { token } } = getState()
        dispatch({ type: 'ON_LOADING' });
        try {

            const { data: { posts, count, per_page_post } } = await axios.get(`http://localhost:80/get_all_posts/${ id }/${ page }`, {
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