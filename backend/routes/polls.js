const express = require('express'); 
const router = express.Router(); 
const Poll = require('../models/poll');  

// debugging middleware
// middleware that is specific to this router 
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now()); 
    next()
}); 

// fetches and sends all the polls from database 
router.get('/', async (req, res) =>{
    try{
        const polls = await Poll.find({}); 
        res.status(200).send({status: "Success", data: polls}); 
    }catch(e){
        res.status(500).send(e); 
    }
});

// creates a new poll in the polls collection 
router.post('/', async (req, res) =>{
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
router.patch('/:id/comments', async (req, res) =>{
    try{
        const updates = req.body;
        console.log("the comments in body are", updates); 
        const poll = await Poll.findByIdAndUpdate(req.params.id, updates);
        const result = {status: 'Success'};   
        // note that sending this poll will not be the updated poll, it will be the poll prior to the updates
        // which is something to watch out for while coding the front end 
        res.status(200).send(result);  
    }catch(e){
        res.status(500).send({status: 'Error'});  
    }
}); 
// udpates votes on a poll 
router.patch('/:id/votes', async (req, res) =>{
    try{
        // same code as above so obviously can be wrapped into its own function 
        const updates = req.body; 
        const poll = await Poll.findByIdAndUpdate(req.params.id, updates); 
        res.status(200).send({status: 'Success'});  
    }catch(e){
        res.status(500).send({status: 'Error'}); 
    }
});
// get by id 
router.get('/:id', async (req, res) =>{
    try{ 
        const poll = await Poll.findById({_id: req.params.id});
        res.status(200).send({status: 'Success', data: poll});  
    }catch(e){
        console.log(e); 
        res.status(500).send({status: 'Error'}); 
    }
}); 

module.exports = router; 