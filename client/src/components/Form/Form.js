import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { getPosts, createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    // state >>> a value of post data
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });
    // find the post with id same as currentId
    const post = useSelector((state) => currentId ? state.posts.find((post) => post._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(post){
            setPostData(post);
        }
        // dependency array: on what changes, the callback function should run
        // if value 'post' has changed, invoke setPostData
    }, [post])

    const handleSubmit = (e) => {
        // prevent to get refresh in the browser
        e.preventDefault();

        if(currentId) {
            dispatch(updatePost(currentId, postData));
        } else {
            // post the postData from state
            // after dispatch, action will be handled by reducer
            dispatch(createPost(postData));
        }
        
        clear();
        dispatch(getPosts());    
    }

    const clear = () => {        
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
        console.log("currentId set to null!");
        setCurrentId(null);
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId ? 'Editing' : 'Creating' } a memory</Typography>
                <TextField 
                    name="creator" 
                    variant="outlined" 
                    label="Creator" 
                    fullWidth
                    value={postData.creator}
                    // persist all data, and only change specific property of that object
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                />
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
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
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
    );
};

export default Form;