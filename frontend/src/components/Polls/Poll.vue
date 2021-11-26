<template>
    <div class="wrapper">
        <li>
            <h1>{{displayTitle}}</h1> 
            <poll-options 
                v-if="!userVoted"
                :pollOptions="displayOptions"
                :name="id"
                @user-voted="changeVoted"> 
            </poll-options>
            
            <poll-results
                v-else
                :pollResults="displayOptions">
            </poll-results>

            <comments 
                v-if="displayComments" 
                :comments="displayComments">
            </comments> 
            <router-link v-if="!isOnRoute" :to="'/polls/'+this.id" class="view-link">View</router-link>

        </li>
    </div>
</template>
<script>
import PollOptions from './PollOptions.vue'
import Comments from './Comments.vue' 
import PollResults from './PollResults.vue'
export default {
    components: {PollOptions, Comments, PollResults},  
    props: ['id', 'title', 'options', 'comments'],
    data(){
        return{
            userVoted: false, 
            displayTitle: '', 
            displayOptions: [], 
            displayComments: null, // type: array. is initially null for rendering conditions  
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
        }, 
        changeVoted(updatedOptions){
            this.displayOptions = updatedOptions;  
            this.userVoted = true;
            // this works  
            // send a request to the backend notifying it that we changed the poll
            // -> add to this user's votedOn array with the id of this poll 
        }
    }
}
</script>
<style scoped>
.wrapper{
    margin: 0 auto; 
    border-radius: 0.5em;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    width: 50%;
}
li{
    list-style: none;
    text-align: center; 
}
h1{
    padding: 2em 3em;
    background-color: rgb(74, 74, 184);
    color: white;   
}

</style>