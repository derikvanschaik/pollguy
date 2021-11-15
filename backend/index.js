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

app.get('/polls', async (req, res) =>{
    try{
        const polls = await Poll.find({}); 
        res.status(200).send(polls); 
    }catch(e){
        res.status(500).send(e); 
    }
});

// creates a new poll in the polls collection 
app.post('/polls', async (req, res) =>{
    const newPoll = new Poll(req.body);
    // save new poll to db
    try{
        await newPoll.save();
        const result = {status: 'Success', data: newPoll}; 
        res.status(200).send(result); 
    }catch(e){
        res.status(500).send({status: 'Error'});  
    }

});
// updates poll comments 
app.patch('/polls/:id/comments', async (req, res) =>{
    try{
        const updates = req.body; 
        const poll = await Poll.findByIdAndUpdate({_id: req.params.id}, updates);
        const result = {status: 'Success', data: poll};   
        // note that sending this poll will not be the updated poll, it will be the poll prior to the updates
        // which is something to watch out for while coding the front end 
        res.status(200).send(result);  
    }catch(e){
        console.log("error in posting comment on poll", e); 
        res.status(500).send({status: 'Error'});  
    }
}); 
// udpates votes on a poll 
app.patch('/polls/:id/votes', async (req, res) =>{
    try{
        // same code as above so obviously can be wrapped into its own function 
        const updates = req.body; 
        const poll = await Poll.findByIdAndUpdate({_id: req.params.id}, updates); 
        res.status(200).send({status: 'Success', data: poll});  
    }catch(e){
        res.status(500).send({status: 'Error'}); 
    }
}); 

app.listen(port, (req, res) =>{
    console.log(`listening on port ${port}`); 
}); 