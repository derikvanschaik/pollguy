<template>
  <li class="poll-el-container"> 
        <header>
            <h1>{{title}}</h1>
            <hr> 
        </header>

        <poll-option-list :options="options" @user-choice="setChoice"></poll-option-list>

        <div class="submit-and-view-wrapper">
            <button @click="voteOnPoll">Vote On Poll</button> 
            <a @click="toggleView" href="#">{{viewMessage}}</a> 
        </div>

        <comments v-if="viewing" :comments="comments"></comments>

        <div class="make-comment" v-if="viewing">
            <input v-model="newComment">
            <button @click="addComment">Add Comment</button> 
        </div>
  </li>
</template>

<script>
import Comments from './Comments.vue';
import PollOptionList from './PollOptionList.vue';

export default {
    components:{Comments,PollOptionList},  
    props: ['title', 'options', 'comments'], 
    emits: ['post-comment'], 
    computed: {
        viewMessage(){
            if(!this.viewing){
                return `Show ${this.comments.length} comments`; 
            }
            return `Hide ${this.comments.length} comments`; 
        }
    }, 
    data(){
        return{
            viewing: false,
            chosenOption: null,  
            newComment: ""
        }
    }, 
    methods: {
        toggleView(){
            this.viewing = !this.viewing; 
        },
        voteOnPoll(){
            // user did not select an option 
            if(!this.chosenOption){
                return; 
            }
            // send data to backend 
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
            this.$emit('post-comment', this.newComment, this.title);  
            this.newComment = ""; 
        }
    }
}
</script>
<style scoped>
.poll-el-container{ 
    list-style-type: none;
    border: 1px solid; 
    border-radius: 0.5em;
    margin: 0 auto;
    margin-top: 1%; 
    width: 40% 
}
.poll-el-container:hover{
    cursor: pointer; 
}
.submit-and-view-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center; 
}

</style>