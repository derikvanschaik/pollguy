<template>
  <div>

    <div v-if="!nameSubmitted" class = "get-user-name"> 
      <h1>Welcome to PollGuy, we just need to grab your name first before proceeding!</h1>  
      <input v-model="name" placeholder="Enter Your name">
      <button @click="setName">Submit Name</button> 
    </div>

    <div v-else>
      <poll-list v-if="polls" :pollData="polls" ></poll-list>
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
    setName(){
      if(!this.name){
        return; 
      }
      this.nameSubmitted = true; 
      localStorage.name = this.name; 
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
