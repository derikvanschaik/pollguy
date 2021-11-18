const mongoose = require('mongoose'); 

const Poll = mongoose.model('Poll', { 
    title:{
        type: String, 
        required: true 
    }, 
    options:{
        type: [{option: String, votes: Number}],    
        required: true 
    },
    comments: {
        type: [{user: String, comment: String}], 
        required: true 
    },
    createdBy:{
        type: String, 
        required: true 
    }
});

module.exports = Poll; 