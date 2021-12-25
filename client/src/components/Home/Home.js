import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { getPosts } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

const Home = () => {
    // set initial id to null, if nothing is selected
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();

    // accept 2 parameters
    // 1.callback function
    // 2. dependency array
    useEffect(() => {
        // after dispatch, will go to posts reducers
        dispatch(getPosts());
        // dependency array: on what changes, the callback function should run
        // for example, if currentId has changed, invoke dispatch(getPosts())
    }, [currentId, dispatch]);

    return (
        <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    )
}

export default Home;
