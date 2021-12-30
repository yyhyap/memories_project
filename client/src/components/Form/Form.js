import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { getPosts, createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    // state >>> a value of post data
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });
    // find the post with id same as currentId
    const post = useSelector((state) => currentId ? state.posts.find((post) => post._id === currentId) : null);
    const authData = useSelector((state) => state.auth.authData);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    
    useEffect(() => {
        if(post){
            setPostData(post);
        }
        // dependency array: on what changes, the callback function should run
        // if value 'post' has changed, invoke setPostData
    }, [post])

    const handleSubmit = async(e) => {
        // prevent to get refresh in the browser
        e.preventDefault();

        if(currentId) {
            await dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        } else {
            // post the postData from state
            // after dispatch, action will be handled by reducer
            await dispatch(createPost({ ...postData, name: user?.result?.name }));
        }
        
        clear();
        // dispatch(getPosts());    
    }

    const clear = () => {        
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
        console.log("currentId set to null!");
        setCurrentId(null);
    }

    // if(!authData?.result?.name) {
    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please sign in to create your own memories and like other's memories.
                </Typography>
            </Paper>
        )
    } else {
        console.log('Read authData: ', authData);
        return (
            <Paper className={classes.paper} elevation={6}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography variant="h6">{ currentId ? 'Editing' : 'Creating' } a memory</Typography>
                    <TextField 
                        name="title" 
                        variant="outlined" 
                        label="Title" 
                        fullWidth
                        value={postData.title}
                        // persist all data, and only change specific property of that object
                        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                    />
                    <TextField 
                        name="message" 
                        variant="outlined" 
                        label="Message" 
                        fullWidth
                        value={postData.message}
                        // persist all data, and only change specific property of that object
                        onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                    />
                    <TextField 
                        name="tags" 
                        variant="outlined" 
                        label="Tags" 
                        fullWidth
                        value={postData.tags}
                        // persist all data, and only change specific property of that object
                        onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                    />
                    <div className={classes.fileInput}>
                        <FileBase 
                            type="file"
                            multiple={false}
                            onDone = {({base64}) => setPostData({ ...postData, selectedFile: base64})}
                        />
                    </div>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </form>
            </Paper>
        )
    }
};

export default Form;