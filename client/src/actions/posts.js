import * as api from '../api';

// Action Creators, used by App.js dispatch
// async (dispatch) >>> using redux thunk
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        // dispatch the 'action'
        dispatch({ type: 'FETCH_ALL', payload: data});
    } catch (error) {
        console.log(error.message);
    }
    // // type >>> type of the action
    // // payload >>> data of the action
    // const action = { type: 'FETCH_ALL', payload: []};
    // dispatch(action);
}

export const createPost = (newPost) => async(dispatch) => {
    try {
        const { data } = await api.createPost(newPost);

        dispatch({ type: 'CREATE', payload: data })
    } catch (error) {
        console.log(error);
    }
}