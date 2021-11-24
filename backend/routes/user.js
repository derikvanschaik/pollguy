const express = require('express'); 
const router = express.Router(); 
const Poll = require('../models/poll');  

// debugging middleware 
router.use(function timeLog (req, res, next) {
    console.log('hitting a router');
    console.log(req.params.user);  
    next()
}); 

// this route fetches all polls created by a specific user
router.get('/:user/polls', async (req, res) =>{
    try{
        const polls = await Poll.find({createdBy: req.params.user});
        const pollsInfo = polls.map(poll => {
            return {id: poll._id, title: poll.title} 
        });  
        res.status(200).send({status: 'Success', data: pollsInfo}); 
    }catch(e){
        res.status(500).send({status: 'Error'}); 
    }
});
// this route fetches all comments made by a specific user 
router.get('/:user/comments', async (req, res) =>{
    try{
        const polls = await Poll.find({});
        const comments = {}; // {pollId: comments: []}

        polls.forEach(poll =>{
            poll.comments.forEach(comment =>{
                if (comment.user === req.params.user){
                    if(comments[poll._id]){
                        comments[poll._id].push(comment.comment);  
                    }else{
                        comments[poll._id] = [comment.comment]; 
                    }
                }
            }); 
        });
        res.status(200).send({status: 'Succes', data: comments}); 
    }catch(e){
        console.log(e); 
        res.status(500).send({status: 'Error'});    
    }
});

module.exports = router; 