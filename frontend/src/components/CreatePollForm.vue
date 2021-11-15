<template>
<div class="container-backdrop">
    <div class="container">
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
            <button @click="cancelForm">Cancel</button> 
        </form>
    </div>
</div>
</template>

<script>
 
export default {
    emits:['create-poll', 'cancel-poll'],   
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
        }, 
        cancelForm(){
            this.$emit('cancel-poll'); 
        }
    }
}
</script>
<style scoped>
li{
    list-style-type: none; 
}
/* copied and pasted from web */
/* this creates that effect where the modal 'pops over' the rest of the elements and makes background dark */
.container-backdrop{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}
.container {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    border: 1px solid; 
    border-radius: 1em;
    overflow-y: auto;
    overflow-x: auto;
    width: 700px; 
    height: 500px;
    padding-bottom: 40px; 
}

</style>
