const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId:{
        type: String,
        unique: true
    },
    desc:{
        type: String,
        required: true,
        max: 500
    },
    image:{
        type: String,
        required: false
    },
    likes:{
        type: Array,
        default: []
    },
    categories:{
        type: Array,
        required: false,
    }
},
 { timestamps: true}
 );


 module.exports = mongoose.model("Post", PostSchema)