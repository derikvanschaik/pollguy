const express = require("express");
const cors = require("cors"); 
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Poll = require('./models/poll.js'); // import Poll model
const polls = require('./routes/polls'); // import polls routes 
const user = require('./routes/user'); // import user routes 

// connect to db 
mongoose.connect('mongodb://127.0.0.1:27017/polls');  
// middleware 
app.use(express.json()); 
app.use(cors());
// connect to polls router
app.use('/polls', polls);
app.use('/user', user);  


app.listen(port, (req, res) =>{
    console.log(`listening on port ${port}`); 
}); 