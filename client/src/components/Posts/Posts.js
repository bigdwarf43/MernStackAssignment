import React, { useState, useEffect } from 'react';
import Post from './Post/Post';
import { Grid, CircularProgress } from '@material-ui/core';

import useStyles from './styles';

import { useSelector } from 'react-redux';

const Posts = ({setcurrentid}) => {
    const classes = useStyles();
    const posts = useSelector((state) => state.posts);

    console.log("Hiya"+posts)
    return(
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
              {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={6} md={6}>
                  <Post post={post} setcurrentid = {setcurrentid}/>
                </Grid>
              ))}
            </Grid>
          )
    )
}

export default Posts;