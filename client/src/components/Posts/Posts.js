import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post.js';

import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
    /**
     * When an action is dispatched, useSelector() will do a reference comparison of the previous selector result value and the current result value. 
     * If they are different, the component will be forced to re-render. 
     * If they are the same, the component will not re-render.
     */
    // Each call to useSelector() creates an individual subscription to the Redux store.
    // refer to all the posts inside reducer
    const { posts, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles();

    console.log('Posts in Posts component: ', posts);

    if(!posts.length && !isLoading) { 
        return 'No posts';
    }

    return (
        // circularprogress is the loading spinner
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
};

export default Posts;