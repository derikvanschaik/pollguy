const express = require('express'); 
const router = express.Router(); 
const Poll = require('../models/poll');  
const User = require('../models/user');

// creates a new user from the body of the post 
router.post('/', async (req, res) =>{ 
    try{
        const user = new User(req.body);  
        await user.save();
        res.status(200).send({status: 'Success'}) 
    }catch(e){
        res.status(500).send({status: 'Error', error: e})  
    }   
    
});

// this route fetches all polls created by a specific user
router.get('/:user/polls', async (req, res) =>{
    try{
        const user = await User.findOne({name: req.params.user}); 
        // send the created polls by user in data field of response 
        res.status(200).send({status: 'Success', data: user.created}); 
    }catch(e){
        res.status(500).send({status: 'Error'}); 
    }
});
// this route fetches all comments made by a specific user 
router.get('/:user/comments', async (req, res) =>{
    try{
        const user = await User.findOne({name: req.params.user});
        // send the comments created by user in data field  
        res.status(200).send({status: 'Succes', data: user.comments});  
    }catch(e){
        console.log(e); 
        res.status(500).send({status: 'Error'});    
    }
});

module.exports = router; 