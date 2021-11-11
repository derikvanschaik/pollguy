<template>
  <li class="poll-el-container"> 
        <header>
            <h1>{{title}}</h1>
            <hr> 
        </header>

        <poll-option-list :options="options"></poll-option-list> 

        <a @click="toggleView" href="#">{{viewMessage}}</a> 
        <comments v-if="viewing" :comments="comments"></comments> 

        <div class="make-comment" v-if="viewing">
            <input v-model="newComment">
            <button>Add Comment</button> 
        </div>
  </li>
</template>

<script>
import Comments from './Comments.vue';
import PollOptionList from './PollOptionList.vue';

export default {
    components:{Comments,PollOptionList},  
    props: ['title', 'options', 'comments'], 
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
            newComment: '' 
        }
    }, 
    methods: {
        toggleView(){
            this.viewing = !this.viewing; 
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

</style>