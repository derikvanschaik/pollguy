<template>
  <div>
    <div v-if="!nameSubmitted" class = "get-user-name"> 
      <h1>Welcome to PollGuy, we just need to grab your name first before proceeding!</h1>  
      <input v-model="name" placeholder="Enter Your name">
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
    await this.fetchPolls();
    this.name = localStorage.name;
    this.nameSubmitted = this.name !== null && this.name !== undefined; 
    // console.log("mounted, ", this.name, this.nameSubmitted); 

  }, 
  data(){
    return{
      polls: null,
      name: null, // name of user 
      nameSubmitted: false,
      clickedCreatePoll: false, 
      devURL : 'http://localhost:3000' 
    }
  }, 
  methods:{
    async fetchPolls(){
      try{
        const result = await fetch(this.devURL + '/polls'); 
        const data = await result.json();
        this.polls = data.reverse(); // reverse chronological order 
        // create a hasVoted property in polls data 
        // later we will fetch this from local storage 
        this.polls.forEach(pollObj => pollObj.hasVoted = false); 

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
    async voteOnPoll(chosenOption, id){
      const poll = this.findPollById(id);
      // create updated options array to send to backend 
      const updatedOptions = []; 
      poll.options.forEach(option =>{
        if(option.option === chosenOption){
          updatedOptions.push({option: option.option , votes : option.votes + 1}); 
        }else{
          updatedOptions.push({option: option.option, votes: option.votes}); 
        }
      });
      // send updated options to backend
      const data = {options: updatedOptions}; 
      const result = await this.putData(`${this.devURL}/polls/${id}/votes`, data, 'PATCH');  
      if(result.status === 'Success'){
        const thisOption = poll.options.find(option => option.option === chosenOption); 
        thisOption.votes += 1;
        poll.hasVoted = true; 
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

</style>
