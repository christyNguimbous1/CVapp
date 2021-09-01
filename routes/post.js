const router = require('express').Router()
const Post = require('../models/Post')


//create a post
router.post('/', async (req, res) =>{
    const newPost = new Post(req.body)
    try {
        const savePost = await newPost.save()
        res.status(200).json(savePost)
    } catch (error) {
        res.status(500).json(error)
    }
})

//update your Post
router.put('/:id', async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({ $set: req.body })
            res.status(200).json('you updated your post')
        }else{
            res.status(403).json('you can only update your post')
        }
    } catch (error) {
        res.status(500).json(error)
    }
})


//delete a post
router.delete('/:id', async (req, res) =>{
    const post = await Post.findById(req.params.id);
    try {
        if(post.userId === req.body.userId){
            await post.deleteOne()
            res.status(200).json('you deleted your post')
        }else{
            res.status(403).json('you can delete only your post')
        }
    } catch (error) {
        res.status(500).json(error)
    }
})


//like and dislike  a post
router.put('/:id/like', async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({ $push:{ likes: req.body.userId}})
            res.status(200).json('you liked this post')
        }else{
             await post.updateOne({ $pull:{ likes: req.body.userId}})
            res.status(200).json('you unliked this post')
        }
    } catch (error) {
        
    }
})


//get a post
router.get('/:id' , async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

//get post of all our following friends
router.get('/timeline', async (req, res) =>{
    let postContainer = [];
    try {
        const currentUser = await Post.findById(req.body.userId);
        const userPost = await Post.find({userId: currentUser._id})
        const friendPost = await Promise.all(
            currentUser.following.map((friendId) =>{
                post.find({ userId: friendId})
            })
        )
        res.json(userPost.concat(...friendPost))
    } catch (error) {
        res.status(500).json(error) 
    }
})


module.exports = router