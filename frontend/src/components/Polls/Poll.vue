<template>
    <div>
        <li>
            <h1>{{displayTitle}}</h1> 
            <poll-options 
                :pollOptions="displayOptions"
                :name="id"> 
            </poll-options>
            <router-link v-if="!isOnRoute" :to="'/polls/'+this.id">View</router-link> 
        </li>
    </div>
</template>
<script>
import PollOptions from './PollOptions.vue'
export default {
    components: {PollOptions},  
    props: ['id', 'title', 'options', 'comments'],
    data(){
        return{
            displayTitle: '', 
            displayOptions: [], 
            displayComments: [], 
            isOnRoute: false // boolean indicating wether the route in browser contains this id in its param 
        }
    }, 
    async created(){
        // we need to fetch this info from the database if any of these props are null 
        if (![this.title, this.options, this.comment].some(prop => prop) ){
            const data = await this.fetchPoll(); 
            if (data){
                this.displayTitle = data.title; 
                this.displayOptions = data.options; 
                this.displayComments = data.comments;
                this.isOnRoute = true;    
            }else{
                console.log("error in fetching polls from data base from Poll.vue component");  
            }
        }else{
            this.displayTitle = this.title; 
            this.displayOptions = this.options; 
            this.displayComments = this.comments;
            this.isOnRoute = false;  
        }
    },
    methods:{
        // fetches poll data from backend 
        async fetchPoll(){
            const result = await fetch('http://localhost:3000/polls/' + this.id); 
            const data = await result.json(); 
            if (data.status === "Success"){
                return data.data; 
            }
            return null; 
        }
    }
}
</script>