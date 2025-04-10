import mongoose from 'mongoose';
import postMessage from '../models/postsMessage.js'

export const getPosts = async function (req, res) {
    try {
        const posts = await postMessage.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createPost = async function(req, res){
    const body = req.body
    try {
        const post = new postMessage(body)
        await post.save();
        res.status(201).json(post); 
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const updatePost = async function (req, res) {
    const {id} = req.params
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return req.status(404).json({message:'Not Found'})
        const post = await postMessage.findByIdAndUpdate(id, req.body, {new:true})
        return res.json(post)
    } catch (error) {
        console.log(error.message)
    }
}

export const deletePost = async function (req, res){
    const {id} = req.params

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:'Invalid id'});
    
        await postMessage.findByIdAndDelete(id)
        return res.json({message:'Success'})
    } catch (error) {
        console.log(error.message)
    }
}

export const likePost = async (req, res) =>{
    const {id, like} = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) return res.json({message:'Error'})
        const post = await postMessage.findById(id);
        post.liked += (like === 'like'?1:-1) 
        await post.save()
        return res.json(post)
    } catch (error) {
        console.log(error.message)
    }
    
}