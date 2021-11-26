const mongoose = require('mongoose');
// Uncomment connection line for testing 
// connect to db 
// mongoose.connect('mongodb://127.0.0.1:27017/polls');  

const User = mongoose.model('User', { 
    name :{
        type: String, 
        required: true 
    }, 
    created:{
        type: [{id: String, title: String}],    
        required: true 
    },
    comments: {
        type: [{id: String, title: String, comments: [String]}],  
        required: true 
    },
    votedOn:{
        type: [{id: String, title: String}], 
        required: true 
    }
});

// testing model
const createNewUser = async () =>{
    const me = new User(
        {
            name: 'Edan',
            created: [], 
            comments: [], 
            votedOn: [] 
        }
    )
    try{
        await me.save(); 
        console.log("saved the poll!") 
    }catch(e){
        console.log("could not save the poll :/")
        console.log(e); 
    }
}
// createNewUser(); 

module.exports = User;  