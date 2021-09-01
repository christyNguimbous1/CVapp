const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')

//REGISTER THE USER WITH THE EMAIL AND PASSWORD AND USERNAME
router.post('/register', async (req, res) => {
    //creating a new user with the post method
        try {
            const salt =  await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);//hashing the password 
            //takng the users information and store it in the db
            const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
            const user = await newUser.save()
            res.status(200).json(user)
            res.send('okay')
        } catch (error) {
            console.log(error);
        }
})


//LOGIN USER WITH EMAIL AND PASSWORD
router.post('/login' , async (req, res) => {
    try { 
        //checking for a valid email
        const user = await User.findOne({email: req.body.email})
        !user && res.status(404).json('user not found');

        //checking for a valid password
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json('wrong password')

        res.status(200).json(user)
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;