import express from 'express'
import {getPosts, createPost, updatePost, deletePost, likePost} from '../controllers/postsC.js';

const Router = express.Router();

Router.get('/', getPosts);
Router.post('/', createPost);
Router.patch('/:id', updatePost)
Router.delete('/:id', deletePost) 
Router.patch('/:id/:like', likePost)

export default Router