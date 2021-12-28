import PostMessage from "../models/postMessage.js";
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        
        // console.log(postMessages);

        // return status code 200, and the array of post messages found from MongoDB in JSON format
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// query >>> /posts?id=123
// params >>> /posts/:id -> 123
export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        // 'i' >>> ignore case
        // TEST test TEst >>> test
        const title = new RegExp(searchQuery, 'i');

        // find the posts either match these 2 criteria
        // title
        // or one of the tags
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ] });

        res.status(200).json({ data: posts })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

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

export const deletePost = async (req, res) => {
    const{ id: _id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id!');
    }

    try {
        await PostMessage.findByIdAndRemove(_id);

        res.json({ message: 'Post deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }    
}

export const likePost = async (req, res) => {
    const{ id: _id} = req.params;

    if(!req.userId) {
        res.json(401).json({ message: 'Unauthenticated' });
    }

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('No post with that id!');
    }

    try {
        const post = await PostMessage.findById(_id);

        const index = post.likes.findIndex((id) => id === String(req.userId));

        // if userId not found in post.likes, will return -1
        if(index === -1){
            // like the post
            post.likes.push(req.userId);
        } else {
            // dislike the post
            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });

        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }    
}