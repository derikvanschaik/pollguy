<template>
    <ul>
        <form>
            <fieldset>
                <li v-for="option,idx in pollOptions" :key="idx">  
                            <input type="radio" :name="name" @click="choose(idx)">
                            <label :for="name">{{option.option}}</label>
                </li>
            </fieldset>
            <button @click="voteOnPoll">Vote</button> 
        </form>
    </ul>
</template>
<script>
export default {
    // 'name' prop is the id of the poll in the database 
    props: ['pollOptions', 'name'],
    emits: ['user-voted'],  
    data(){
        return{
            chosen : null 
        }
    }, 
    methods:{
        choose(idx){
            this.chosen = this.pollOptions[idx].option; 
        },
        getUpdatedVotes(){
            return this.pollOptions.map(option =>{
                if (option.option === this.chosen){
                    return {option: option.option, votes: option.votes + 1}; 
                }
                return {option: option.option, votes: option.votes}; 
            }); 
        }, 
        async voteOnPoll(event){
            // prevent form default ? 
            event.preventDefault(); 
            if(!this.chosen){ 
                return console.log("Please choose an option before voting"); 
            }
            const postedData = {options: this.getUpdatedVotes() };
            const updates = {method: 'PATCH', body: JSON.stringify(postedData)}
            const pollId = this.name; // name prop is actually just the poll id 
            const result = await fetch('http://localhost:3000/polls/'+ pollId+ '/votes',updates);
            const data = await result.json(); 
            if (data.status==="Error"){
                return console.log("Error in posting your vote on the poll"); 
            }
            // emit to Poll.vue that the user has voted on this poll
            // send the upated votes as well 
            const updatedOptions = this.getUpdatedVotes(); 
            this.$emit('user-voted', updatedOptions);  
        }
    }
}
</script>
<style scoped>
li{
    list-style-type: none;
    text-align: left; 
}
input[type=radio]{
    margin: .4rem;
}
form{
    font-size: x-large;  
}
button {
  background-color: rgb(74, 74, 184); 
  border-radius: 0.4em; 
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
button:hover{
    cursor: pointer; 
}
</style>