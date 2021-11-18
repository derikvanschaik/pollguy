<template>
    <li class="poll-el-container"> 
            <header>
                <h1>{{title}}</h1>
                <hr> 
            </header>

            <div v-if="!hasVoted"> 
                <poll-option-list :options="options" @user-choice="setChoice"></poll-option-list>
                <button @click="voteOnPoll">Vote On Poll</button> 
            </div>

            <poll-results v-else :options="options"></poll-results>

            <div> 
                <a @click="toggleView" href="#">{{viewMessage}}</a> 
            </div>

            <comments v-if="viewing" :comments="comments"></comments>

            <div v-if="viewing">
                <input v-model="newComment" type="text">
                <button @click="addComment">Add Comment</button> 
            </div>
    </li>
</template>

<script>
import Comments from './Comments.vue';
import PollOptionList from './PollOptionList.vue';
import PollResults from './PollResults.vue'; 

export default {
    components:{Comments, PollOptionList, PollResults},
    props: ['title', 'options', 'comments', 'id', 'hasVoted'],  
    emits: ['post-comment', 'make-vote'], 
    computed: {
        viewMessage(){
            if(!this.viewing){
                return `Show ${this.comments.length} comments`; 
            }
            return `Hide ${this.comments.length} comments`; 
        }
    },
    // for testing 
    mounted(){
        console.log("user has voted on this poll = ", this.hasVoted); 
    }, 
    data(){
        return{
            viewing: false,
            chosenOption: null,  
            newComment: ""
        }
    }, 
    methods: {
        toggleView(event){
            // when we click on link the default event
            // will create that annoying 'jump back up to top of page' attribute. 
            event.preventDefault(); 
            this.viewing = !this.viewing; 
        },
        voteOnPoll(){
            // user did not select an option 
            if(!this.chosenOption){
                return; 
            }
            // send data to backend
            this.$emit('make-vote', this.chosenOption, this.id);  
        },
        setChoice(choiceObj){
            this.chosenOption = choiceObj.option;

        },
        addComment(){
            if (!this.newComment.length > 0 ){
                return; 
            }
            // emit comment to App.vue so that it can send to backend
            // for now we will pass in the new comment and poll title to help
            // the backend find which poll it needs to update its comment to
            this.$emit('post-comment', this.newComment, this.id);  
            this.newComment = ""; 
        }
    }
}
</script>
<style scoped>

.poll-el-container{
    background-color: white; 
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); 
    list-style-type: none;
    border-radius: 0.5em;
    margin: 0 auto;
    margin-top: 1%; 
    width: 40%;
    padding: 2em 0; 
}
.poll-el-container:hover{
    cursor: pointer; 
}
.submit-and-view-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center; 
}
/* input{
    width: 30em;
    height: 2em; 
    margin: 2em 0em; 
} */

</style>