const express = require("express");
const cors = require("cors"); 
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
// mock data before i made the mongoose models etc 
const data = [ 
    {
        title: 'Who is the better friend, Margaret of Jennifer?', 
        options:[{option:'Jennifer', votes: 12}, {option:'Margaret', votes: 14}],
        comments: [
            {user: "Jeff", comment:'Yeah right'}, 
            {user: 'Alex', comment: 'LOL wth!'} 
        ]
    },
    {
        title: 'Is pineapple on pizza weird?', 
        options:[{option:'Yes', votes:1}, {option:'No', votes: 0}],
        comments: [
            {user: 'Dennis', comment: "lets gooo"},
            {user: 'Amanda', comment: 'Not at all'}
        ]
    }
];

app.get('/polls', (req, res) =>{
    
    res.send(data);  
});

app.post('/comment', (req, res) =>{
    const {newComment, pollTitle, name} = req.body;
    for (let i = 0; i < data.length; i++){
        if (data[i].title === pollTitle){
            data[i].comments.push({user: name, comment: newComment});
            break; 
        }
    }
    // send back polls with cur data 
    res.send(data);   
}); 
app.post('/option', (req, res) =>{
    const {option, pollTitle} = req.body;
    for (let i = 0; i < data.length; i++){
        if (data[i].title === pollTitle){
            const options = data[i].options; 
            for (let j = 0; j < options.length; j++){
                if(options[j].option === option){ 
                    data[i].options[j].votes += 1; // increment the vote
                    break; 
                }
            }
        }
    }
    // send back polls with cur data 
    res.send(data);   
}); 

app.listen(port, (req, res) =>{
    console.log(`listening on port ${port}`); 
}); 