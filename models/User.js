const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 20
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        min: 8
    },
    desc: {
        type: String,
        max: 50,
    },
    profilePic:{
        type: String,
        default: ""
    },
    coverPic:{
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
},
 { timestamps: true}
 );


 module.exports = mongoose.model("User", UserSchema)