import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import Pagination from '../Pagination';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    // set initial id to null, if nothing is selected
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    // read the URL see whether has 'page' parameter in there
    const page = query.get('page') || 1;
    const searchQueryFromURL = query.get('searchQuery') || 'none';
    const tagsFromURL = query.get('tags');
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const pathName = useLocation().pathname;

    console.log(pathName);
    console.log(searchQueryFromURL, tagsFromURL);

    // // accept 2 parameters
    // // 1.callback function
    // // 2. dependency array
    // useEffect(() => {

    //     async function fetchPosts() {
    //         if(pathName.includes('/posts/search') && (searchQueryFromURL || tagsFromURL)) {
    //             await dispatch(getPostsBySearch({ search: searchQueryFromURL, tags: tagsFromURL }));
    //         } else {
    //             // after dispatch, will go to posts reducers
    //             await dispatch(getPosts());
    //         }
    //     }

    //     fetchPosts();

    //     // dependency array: on what changes, the callback function should run
    //     // for example, if currentId has changed, invoke dispatch(getPosts())
    // }, [currentId, dispatch]);

    const searchPost = async() => {
        if(search.trim() || tags) {
            // dispatch -> fetch search post
            await dispatch(getPostsBySearch({ search: search, tags: tags.join(',') }));
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            navigate('/');
        }
    }

    const handleKeyPress = async(e) => {
        // keyCode 13 >>> 'Enter' key
        if(e.keyCode === 13) {
            // search post
            console.log('Enter pressed');
            await searchPost();
        }
    }

    const handleAdd = (tag) => {
        setTags([ ...tags, tag]);
    }

    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    }

    return (
        <Grow in>
                <Container maxWidth="xl">
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                <TextField 
                                    name="search" 
                                    variant="outlined" 
                                    label="Search Memories" 
                                    fullWidth 
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <ChipInput 
                                    style={{ margin: '10px 0' }}
                                    value={tags}
                                    onAdd={handleAdd}
                                    onDelete={handleDelete}
                                    label="Search Tags"
                                    variant="outlined"
                                />
                                <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained">
                                    Search
                                </Button>
                            </AppBar>                            
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                            {(!searchQueryFromURL || !tagsFromURL) ? (
                                <Paper elevation={6} className={classes.pagination}>
                                    <Pagination page={page} />
                                </Paper>
                            ) : null}                            
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    )
}

export default Home;
