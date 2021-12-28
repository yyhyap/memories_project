import * as api from '../api';
import { FETCH_BY_SEARCH, FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

// Action Creators, used by App.js dispatch
// async (dispatch) >>> using redux thunk
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        // dispatch the 'action'
        dispatch({ type: FETCH_ALL, payload: data});
    } catch (error) {
        console.log(error.message);
    }
    // // type >>> type of the action
    // // payload >>> data of the action
    // const action = { type: 'FETCH_ALL', payload: []};
    // dispatch(action);
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

        console.log(data);
        dispatch({ type: FETCH_BY_SEARCH, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (newPost) => async(dispatch) => {
    try {
        const { data } = await api.createPost(newPost);

        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async(dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async(dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: LIKE, payload: data});
    } catch (error) {
        console.log(error);
    }
}