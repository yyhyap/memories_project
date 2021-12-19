import React from 'react';
import { useSelector } from 'react-redux';

import Post from './Post/Post.js';

import useStyles from './styles';

const Posts = () => {
    // refer to reducer posts: posts
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    console.log('Posts in Posts component: ', posts);

    return (
        // <></> >>> shortcut for Fragments
        // fragment can replace <div>
        <>
            <h1>Posts</h1>
            <Post />
            <Post />
        </>
    );
};

export default Posts;