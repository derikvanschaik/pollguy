// UNCOMMENT THE FUNCTION AT LINE 106 TO RUN THIS PROGRAM 

// currently I need to match the data from 'Poll' collection into the 'User' model
// that I created later on.  
// this is what the functions in this file aim to do.


// @Edan you may have to do this too, this file will automate that 
// process for you!  

const mongoose = require("mongoose"); 
const Poll = require('../models/poll');  
const User = require('../models/user');
// connect to db 
mongoose.connect('mongodb://127.0.0.1:27017/polls');

// will fetch all polls 
const fetchPolls = async () =>{
    return await Poll.find({}); 
}
// gets all users that have created a Poll 
// and returns them in an array 
const getAllUsers = async () =>{
    const polls = await fetchPolls();
    const users = {};
    // users can either comment 
    // or create a poll currently....  
    polls.forEach( poll =>{
        users[poll.createdBy] = null; 
        poll.comments.forEach( commentObj =>{
            users[commentObj.user] = null; 
        }); 
    });
    return Array.from(Object.keys(users)); 
}
// returns -> [{id: (poll id), title: (poll title), comments: (array of comments made by user on poll)}]
const getCommentsByUser = async (user) =>{ 
    const userComments = []; 
    const polls = await fetchPolls(); 
    polls.forEach( poll =>{
        const commentInfo = {
            id: poll._id, 
            title: poll.title, 
            comments: [] 
        };
        poll.comments.forEach( commentObj =>{ 
            // for me this or condition exists as I have an undefined user (user with no name) 
            if (commentObj.user == user || (!commentObj.user && user==='undefined') ){
                // append comment to comments field of comment Info of current poll 
                commentInfo.comments.push(commentObj.comment);  
            }
        })
        if (commentInfo.comments.length > 0 ){
            userComments.push(commentInfo); 
        }
    });
    return userComments;  
}
// returns an array of an object containing
// the poll id and title (in that order) created
// by the given user 
const getCreatedPollsByUser = async (user) =>{
    const polls = await fetchPolls(); 
    const createdPolls = [];
    polls.forEach( poll => {
        if (poll.createdBy === user){
            createdPolls.push(
                {id: poll._id, title: poll.title}
                ); 
        }
    })
    return createdPolls; 
}
// saves a new User instance and its fields parsed from current
// Poll database data 
const createUsersFromCurrentPolls = async () =>{
    const users = await getAllUsers();
    // for of allows to call async 
    for( const user of users ){
        const userComments = await getCommentsByUser(user);  
        const userCreatedPolls = await getCreatedPollsByUser(user);
        try{
            const newUserFields = {
                name: user, 
                created: userCreatedPolls, 
                comments: userComments
            } 
            const newUser = new User(newUserFields); 
            await newUser.save(); // saves this into the db under 'User' collection 
        }catch(e){
            console.log(e); 
        }
    }
}
// i accidentally called this twice --> make a function to delete all 
// entries in case you made duplicates...
const deleteAllUsers = async () =>{
    try{
        await User.deleteMany({}); 
        console.log("deleted all users"); 
    }catch(e){
        console.log("couldn't delete all users"); 
        console.log(e); 
    }   
}

// worked for me! -- uncomment to create users from 
// your current poll data !
// deleteAllUsers(); 
// createUsersFromCurrentPolls(); 


//  ** TESTERS ** // 
const testFetchPolls = async () =>{
    const polls = await fetchPolls(); 
    console.log(polls); 
}
const testGetAllUsers = async () =>{
    const users = await getAllUsers(); 
    console.log(users); 
}
const testGetCommentsByUser = async (user) =>{
    const comments = await getCommentsByUser(user);  
    console.log(comments); 
}
const testGetUsersComments = async () =>{
    const usersComments = await getUsersComments(); 
    console.log(usersComments); 
}
const testGetCreatedPollsByUser = async (user) =>{
    const createdPolls = await getCreatedPollsByUser(user); 
    console.log(createdPolls); 
}

