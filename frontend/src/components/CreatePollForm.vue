<template>
  <form @submit.prevent class="poll-form">
      <h1>Poll Title: {{title}}</h1>
      <input v-model="title">
      <button @click="clearTitle">Clear</button> 
      <ul>
          <li v-for="(option, idx) in options" :key="idx"> 
              <h3>Option {{idx+1}}: {{option}}</h3>
              <input v-model="options[idx]" >
              <button @click="clearOption(idx)">Clear</button>
              <button v-if="idx > 1" @click="deleteOption(idx)">Delete Option</button>
          </li>
      </ul>
      <button @click="addOption">Add Another Option</button>
      <button @click="submitForm">Submit</button>  
  </form> 
</template>

<script>
 
export default {
    emits:['create-poll'],  
    data(){
        return{
            title: 'Untitled Poll', 
            options: ['Untitled', 'Untitled'],
            errorCount: 1, 
        }
    },
    methods:{
        clearTitle(){
            this.title = ""; 
        }, 
        clearOption(idx){
            this.options[idx] = ""; 
        }, 
        addOption(){
            this.options.push("Untitled");  
        },
        deleteOption(idx){
            this.options.splice(idx, 1);
        },
        submitForm(){
            // validate form 
            if (this.title === "" || this.options.some(option => option === "")){
                return console.log("No fields can be empty"); 
            }
            // emit validated form 
            this.$emit('create-poll', this.title, this.options); 
        }
    }
}
</script>
<style scoped>
li{
    list-style-type: none; 
}
.poll-form{
    border: 1px solid; 
    border-radius: 1em; 
}
</style>
