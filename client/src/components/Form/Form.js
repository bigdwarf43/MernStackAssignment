import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';


const Form = ({currentid, setcurrentid}) => {
    const classes = useStyles();
    const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    const dispatch = useDispatch()
    
    // if currentid is not equals to null then find the post to be edited
    const post = useSelector((state) => currentid ? state.posts.find((p) => p._id === currentid) :null);

    useEffect(() => {
        if (post) setPostData(post);
      }, [post]);
    

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentid === null) {
            dispatch(createPost(postData));
          } else {
            dispatch(updatePost(currentid, postData));
          }
          clear();
    }

    const clear = () => {
        setcurrentid(null);
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    }


    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentid ? 'Editing' : 'Creating'} a Memory</Typography>

                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator}
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />

                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title}
                    onChange={(e) => setPostData({ ...postData, title: e.target.value })} />

                <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })} />

                <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;