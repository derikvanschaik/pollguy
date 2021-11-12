<template>
  <div>

    <!-- testing poll form -->
    <create-poll-form @create-poll="createNewPoll"></create-poll-form> 
    <!-- Finished testing poll form -->

    <div v-if="!nameSubmitted" class = "get-user-name"> 
      <h1>Welcome to PollGuy, we just need to grab your name first before proceeding!</h1>  
      <input v-model="name" placeholder="Enter Your name">
      <button @click="setName">Submit Name</button> 
    </div>

    <div v-else>
      <poll-list v-if="polls" 
        :pollData="polls" 
        @post-comment="postComment"
        @post-option="postOption">
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
    this.nameSubmitted = this.name !== null;  

  }, 
  data(){
    return{
      polls: null,
      name: null,
      nameSubmitted: false 
    }
  }, 
  methods:{
    async fetchPolls(){
      try{
        const result = await fetch('http://localhost:3000/polls'); 
        const data = await result.json();
        this.polls = data; 
      }catch(e){ 
        console.log("error in fetchPolls method:", e); 
      }
      
    },
    async postData(url, dataToPost){
      const resp = await fetch(url, 
        {
          method: 'POST', 
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
    // posts a new comment to the server 
    // really inefficient implementation as it resets entire poll data just to reflect changes 
    // made on a comment on a single poll .... 
    async postComment(newComment, pollTitle){
       const data = {newComment, pollTitle, name: this.name}; 
       const updatedPolls = await this.postData('http://localhost:3000/comment', data); 
       this.polls = updatedPolls; 
    },
    // posts the user's option on poll 
    async postOption(option, pollTitle){
      const data = {option, pollTitle}; 
      const updatedPolls = await this.postData('http://localhost:3000/option', data); 
      this.polls = updatedPolls; 
    },
    createNewPoll(title, options){
      const pollOptions = []; 
      options.forEach( option =>{
        pollOptions.push({option: option, votes: 0}); 
      }); 
      const newPoll = {title, options: pollOptions, comments: []}; 
      this.polls.push(newPoll); 
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
</style>
