<template>
  <div>

    <div v-if="!nameSubmitted" class = "get-user-name"> 
      <h1>Welcome to PollGuy, we just need to grab your name first before proceeding!</h1>  
      <input v-model="name" placeholder="Enter Your name">
      <button @click="setName">Submit Name</button> 
    </div>

    <div v-else>
      <poll-list v-if="polls" :pollData="polls" @post-comment="postComment"></poll-list>
    </div>

  </div> 
</template>

<script>

import PollList from './components/PollList.vue'

export default {
  components: { PollList },
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
    async postData(dataToPost){
      const resp = await fetch('http://localhost:3000/comment', 
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
       const updatedPolls = await this.postData(data); 
       this.polls = updatedPolls; 
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
