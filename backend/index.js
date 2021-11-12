const express = require("express");
const cors = require("cors"); 
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const data = [ 
    {
        title: 'Who is the better friend, Margaret of Jennifer?', 
        options:[{option:'Jennifer', votes: 12}, {option:'Margaret', votes: 14}], comments: ['Yeah right', 'LOL wth!']
    },
    {
        title: 'Is pineapple on pizza weird?', 
        options:[{option:'Yes', votes:1}, {option:'No', votes: 0}], comments: ['Dude yes!', 'Not at all']
    }
];

app.get('/polls', (req, res) =>{
    
    res.send(data);  
});

app.post('/comment', (req, res) =>{
    const {newComment, pollTitle, name} = req.body;
    for (let i = 0; i < data.length; i++){
        if (data[i].title === pollTitle){
            data[i].comments.push(newComment);
            break; 
        }
    }
    // send back polls with cur data 
    res.send(data);   
}); 

app.listen(port, (req, res) =>{
    console.log(`listening on port ${port}`); 
}); 