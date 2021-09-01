const express = require('express')
const app = express()
const authRout = require('./routes/auth')
const mongoose = require('mongoose');
const path = require('path')
mongoose.connect('mongodb+srv://zenith:zenith@resume.emsai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(console.log('connected to db'));

const PORT = process.env.PORT || 7000



app.use(express.json())
app.use(express.static('public'))
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'landingppage.html'))
})


app.use('/auth', authRout)
app.listen(PORT, (req, res)=>{
    console.log(`server is connect on port ${PORT}`);
})