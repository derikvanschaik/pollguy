<template>
  <div>
    <div v-if="!nameSubmitted" class = "get-user-name">  
      <h1>Welcome to PollGuy, we just need to grab your name first before proceeding!</h1>  
      <input v-model="name" placeholder="Enter Your name" type="text">
      <button @click="setName">Submit Name</button> 
    </div>

    <div v-else>
      <button @click="toggleCreatePoll">Create Poll</button>
      <transition name="fade">
        <create-poll-form 
            v-if="clickedCreatePoll" 
            @create-poll="createNewPoll"
            @cancel-poll="toggleCreatePoll"> 
        </create-poll-form>
      </transition> 

      <poll-list v-if="polls" 
        :pollData="polls" 
        @post-comment="postComment"
        @make-vote="voteOnPoll">
      </poll-list> 
    </div>

  </div> 
</template>

<script>

import PollList from './components/PollList.vue';
import CreatePollForm from './components/CreatePollForm.vue'; 

export default {
  components: { PollList, CreatePollForm},
  name: 'App',
  async mounted(){
    const pollIds = localStorage.getItem('votedOnPolls'); 
    if (pollIds){
      this.votedOnPolls = JSON.parse(pollIds); 
    }else{
      this.votedOnPolls = []; 
    }
    await this.fetchPolls();
    this.polls.forEach(pollObj => pollObj.hasVoted = this.votedOnPolls.includes(pollObj._id));  
    this.name = localStorage.name;
    this.nameSubmitted = this.name !== null && this.name !== undefined;

  }, 
  data(){
    return{
      polls: null,
      name: null, // name of user 
      nameSubmitted: true,   
      clickedCreatePoll: false, 
      devURL : 'http://localhost:3000', 
      votedOnPolls: [] // array of ids of polls that user has voted on -> saved in local storage 
    }
  }, 
  methods:{
    async fetchPolls(){
      try{
        const result = await fetch(this.devURL + '/polls'); 
        const data = await result.json();
        // reverse the list so that the latest poll is displayed first 
        this.polls = data.reverse(); 
      }catch(e){ 
        console.log("error in fetchPolls method:", e); 
      }
      
    },
    // puts data to server 
    async putData(url, dataToPost, method){ 
      const resp = await fetch(url, 
        {
          method: method,  
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToPost) 
        });
      const data = await resp.json(); 
      return data; 
    }, 
    setName(){
      if(!this.name){
        return; 
      }
      this.nameSubmitted = true; 
      localStorage.name = this.name; 
    },
    addPollsToHistory(){
      localStorage.setItem('votedOnPolls', JSON.stringify(this.votedOnPolls)); 
    }, 
    findPollById(id){
      return this.polls.find(poll => poll._id === id); 
    }, 
    async createNewPoll(title, options){
      const pollOptions = [];
      options.forEach( option =>{
        pollOptions.push({option: option, votes: 0}); 
      }); 
      const newPoll = {title : title, options: pollOptions, comments: []};   
      const result = await this.putData(this.devURL + '/polls', newPoll, 'POST');
      this.clickedCreatePoll = false; // want to hide create poll component  
      if(result.status === "Success"){
        // append to front of polls array 
        this.polls.unshift(result.data);  
      }
    },
    toggleCreatePoll(){
      this.clickedCreatePoll = !this.clickedCreatePoll; 
    },
    getUpdatedVotes(poll, chosenOption){
      const updatedOptions = []; 
      poll.options.forEach(option =>{
        if(option.option === chosenOption){
          updatedOptions.push({option: option.option , votes : option.votes + 1}); 
        }else{
          updatedOptions.push({option: option.option, votes: option.votes}); 
        }
      });
      return updatedOptions; 
      
    }, 
    async voteOnPoll(chosenOption, id){
      const poll = this.findPollById(id);
      // create updated options array to send to backend 
      const updatedOptions = this.getUpdatedVotes(poll, chosenOption); 
      // send updated options to backend
      const data = {options: updatedOptions}; 
      const result = await this.putData(`${this.devURL}/polls/${id}/votes`, data, 'PATCH');  
      if(result.status === 'Success'){
        const thisOption = poll.options.find(option => option.option === chosenOption);
        // increment votes on chosenOption and set hasVoted property to true 
        // so that the changes made to the backend reflect in our front end 
        thisOption.votes += 1;
        poll.hasVoted = true;
        // add poll id to votedOnPolls array and to localStorage for persistence in future sessions 
        this.votedOnPolls.push(id); 
        this.addPollsToHistory(); 
      }

    }, 
    async postComment(newComment, id){
      const thisPoll = this.findPollById(id); 
      const newCommentData = {"user" : this.name, comment: newComment}; 
      const updatedComments = [...thisPoll.comments, newCommentData];
      const data = {comments: updatedComments}; 
      const result = await this.putData(`${this.devURL}/polls/${id}/comments`, data, 'PATCH');
      if(result.status === "Success"){
        thisPoll.comments.push(newCommentData); 
      }

    }
  }
}
</script>

<style>
body{
  background-color: #F0F0F0;
}
button {
  background-color: lightblue;
  color: black; 
  border-radius: 8px;
  border-style: none;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 40px;
  line-height: 20px;
  list-style: none;
  margin: 0;
  outline: none;
  padding: 10px 16px;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  vertical-align: baseline;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

#app { 
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
input[type=text]{
  padding: 0.4em 0.2em;
  border-radius: 1em;
  width: 30em;
  height: 2em; 
  margin: 2em 0em;
}
</style>
