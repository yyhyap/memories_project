import * as api from '../api';
import { FETCH_POST, FETCH_BY_SEARCH, FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING } from '../constants/actionTypes';

// Action Creators, used by App.js dispatch
// async (dispatch) >>> using redux thunk
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        console.log('Read page: ', page);
        const { data } = await api.fetchPosts(page);
        console.log('Read data from getPosts: ', data);
        // dispatch the 'action'
        dispatch({ type: FETCH_ALL, payload: data});
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
    // // type >>> type of the action
    // // payload >>> data of the action
    // const action = { type: 'FETCH_ALL', payload: []};
    // dispatch(action);
}

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);
        console.log('Read data from getPost: ', data);
        // dispatch the 'action'
        dispatch({ type: FETCH_POST, payload: data});
        dispatch({ type: END_LOADING });
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
        dispatch({ type: START_LOADING });
        console.log('Read searchQuery: ', searchQuery);
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

        console.log(data);
        dispatch({ type: FETCH_BY_SEARCH, payload: data});
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const createPost = (newPost) => async(dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(newPost);

        dispatch({ type: CREATE, payload: data });
        dispatch({ type: END_LOADING });
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