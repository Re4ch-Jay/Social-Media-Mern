const Post = require("../models/Post")

// create post

const CREATE_POST = async (req, res) => {
    try {
        const post = await Post.create(req.body)
        res.status(200).json(post)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message})
    }
}

// update post 

const UPDATE_POST = async (req, res) => {
    const {id} = req.params;
    try {
        const post = await Post.findById(id);
        if(post.userId === req.body.userId) {
            await Post.updateOne(req.body)
            res.status(200).json(post)
        }else{
            throw Error("You can only update your post")
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

// delete post 

const DELETE_POST = async (req, res) => {
    const {id} = req.params;
    try {
        const post = await Post.findById(id);
        if(post.userId === req.body.userId) {
            await Post.deleteOne();
            res.status(200).json("Your post has been deleted")
        }else{
            throw Error("You can only delete your post")
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

// get a post

const GET_A_POST = async (req, res) => {
    const {id} = req.params;
    try {
        const post = await Post.findById(id);
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}

// get all post 

const GET_ALL_POST = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(404).json({error: error.message})
    }
}

// like and dislike

const LIKE_DISLIKE = async (req, res) => {
    const {id} = req.params;
    const {userId} = req.body;

    try {   
        const post = await Post.findById(id)
        if(!post.likes.includes(userId)) {
            await Post.updateOne({$push: {likes: userId}})
            res.status(200).json("You have been like this post")
        }else{
            await Post.updateOne({$pull: {likes: userId}})
            res.status(200).json("You have been dislike this post")
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
}

module.exports = {CREATE_POST, GET_A_POST, GET_ALL_POST, UPDATE_POST, DELETE_POST, LIKE_DISLIKE}