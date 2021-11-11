<template>
  <poll-list v-if="polls" :pollData="polls" ></poll-list>
</template>

<script>

import PollList from './components/PollList.vue'

export default {
  components: { PollList },
  name: 'App',
  async mounted(){
    this.fetchPolls(); 
  }, 
  data(){
    return{
      polls: null
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
