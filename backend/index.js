const express = require("express");
const cors = require("cors"); 
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Poll = require('./models/poll.js'); // import Poll model   

// connect to db 
mongoose.connect('mongodb://127.0.0.1:27017/polls');  

app.use(express.json()); 
app.use(cors());

app.post('/polls', async (req, res) =>{
    const newPoll = new Poll(req.body);
    // save new poll to db
    try{
        await newPoll.save();
        res.status(200).send(newPoll); 
    }catch(e){
        res.status(500).send(e);  
    }

}); 

app.listen(port, (req, res) =>{
    console.log(`listening on port ${port}`); 
}); 