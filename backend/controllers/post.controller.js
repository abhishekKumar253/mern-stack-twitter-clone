import Notification from "../models/notification.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


export const createPost = async(req, res) => {
    try {
        const {text} = req.body;
        let {img} = req.body;
        const userId = req.user._id.toString();

        const user = await User.findById(userId);
        if(!user) return res.status(404).json({message: "User not found"});

        if(!text && !img){
            return res.status(402).json({error: "Post must have text or image"})
        }

        if(img){
            const uploadedResponse = await uploadOnCloudinary(img)
            img = uploadedResponse.secure_url;
        }
        
        const newPost = new Post({
            user: userId,
            text,
            img,
        })

        await newPost.save();
        res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json({error: "Error in createPost controller"})
    }
}


export const deletePost = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({message: "Post not found"});

        if(post.user.toString() !== req.user._id.toString()){
            return res.status(401).json({error: "You are not authorized to delete this post"})
        }

        if(post.img){
            const imgId = post.img.split("/").pop().split(".")[0];
            await uploadOnCloudinary.destroy(imgId);
        }

        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({message: "Post deleted successfully"})
    } catch (error) {
        res.status(500).json({error: "Error in deletePost controller"})
    }
}

export const commentPost = async(req, res) => {
    try {
        const {text} = req.body;
        const postId = req.params.id;
        const userId = req.user._id;

        if(!text) {
            return res.status(402).json({error: "Text field is required"})
        }

        const post = await Post.findById(postId);
        
        if(!post){
            return res.status(404).json({error: "Post not found"})
        }

        const comment = {user: userId, text};

        post.comments.push(comment);
        await post.save();

        res.status(201).json({message: "Comment added successfully"});
    } catch (error) {
        res.status(500).json({error: "Error in commentPost controller"})
    }
}

export const likeUnlikePost = async(req, res) => {
    try {
        const userId = req.user._id;
        const {id: postId} = req.params;

        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({error: "Post not found"});
        }

        const userLikedPost = post.likes.includes(userId);

        if(userLikedPost){
            // unlike the post
            await Post.updateOne({_id: postId}, {$pull: {likes: userId}});
            await User.updateOne({_id: userId}, {$pull: {likedPosts: postId}});

            const updatedLikes = post.likes.filter((id) => id.toString() !== userId.toString());
            res.status(200).json(updatedLikes);
        }else{
            // like the post
            post.likes.push(userId);
            await Post.updateOne({_id: userId}, {$push: {likedPosts: postId}});
            await post.save();

            const notification = new Notification({
                from: userId,
                to: post.user,
                type: "like",
            });
            await notification.save();

            const updatedLikes = post.likes;
            res.status(200).json(updatedLikes);
        }
    } catch (error) {
        res.status(500).json({error: "Error in likeUnlikePost controller"})
    }
}