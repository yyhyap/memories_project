import { combineReducers } from "redux";

import posts from './posts';

export default combineReducers({
    // can just 'posts'
    posts: posts
});