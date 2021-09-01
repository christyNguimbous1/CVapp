const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');


//update user's account
router.put('/:id', async (req, res) =>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (error) {
                console.log(error);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body})
            res.status(200).json('account has been successfully be updated')
        } catch (error) {
            console.log(error);
        }
    }else{}
})

// delete/remove account for the user
router.delete('/:id', async (req, res) =>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json('account has been deleted successfully')
        } catch (error) {
            console.log(error); 
        }
    }else{
        return res.status(403).json('you can delete only your account')
    }
})


//get a single user
router.get('/:id', async (req, res) =>{
    try {
        const user = await User.findById(req.params.id);
        const {password, updatedAt, ...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        console.log(error);
    }
})

//FOLLOW A PARTICULAR USER
router.put('/:id/follow', async (req, res) =>{
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({ $push: {followers: req.body.userId}})
                await currentUser.updateOne({ $push: {following: req.params.id}})
                res.status(200).json('you are following this user')
            }else{
                res.status(403).json('your are already following this user')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json('you can not follow yourself')
    }
})

// unfollow a particular user
router.put('/:id/unfollow', async (req, res) =>{
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({ $pull: {followers: req.body.userId}})
                await currentUser.updateOne({ $pull: {following: req.params.id}})
                res.status(200).json('you are unfollowed this user')
            }else{
                res.status(403).json('you unfollowed this user')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json('you can not follow yourself')
    }
})

module.exports = router