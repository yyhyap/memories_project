import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        
        console.log(postMessages);

        // return status code 200, and the array of post messages found from MongoDB in JSON format
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = PostMessage(post);

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id!');
    }

    try {
        // include id inside 'post', because Form didnt pass in _id
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true });

        res.json(updatePost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }    
};