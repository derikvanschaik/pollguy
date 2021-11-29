const mongoose = require('mongoose');
const User = require('../models/user');
// Uncomment connection line for testing 
// connect to db 
mongoose.connect('mongodb://127.0.0.1:27017/polls');  

const pullTests = async (userName) => {
    try {
        const test = await User.findOne({name: userName})
        return test
    }catch(e){
        console.log(e)
        return e
    }
}

const createNewUser = async (userName) =>{
    const me = new User(
        {
            name: userName,
            created: [], 
            comments: [], 
            votedOn: [] 
        }
    )
    try {
        await me.save(); 
        console.log("Saved the user!") 
    } catch(e) {
        console.log("Could not save the user :/")
        console.log(e); 
    }
}

const executeCreate = async (userName) => {
    if (await pullTests(userName)) {
        console.log("User already exists")
    } else {
        createNewUser(userName); 
    }
}

executeCreate("Edan")