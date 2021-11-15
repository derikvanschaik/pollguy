<template>
  <ul>
    <poll-element 
        v-for="(poll, idx) in pollData"
        :key="idx"
        :title="poll.title"
        :options="poll.options"
        :comments="poll.comments"
        :id="poll._id" 
        @post-comment="postComment"
        @post-option="postOption">   
    </poll-element>
  </ul>
</template>

<script>
import PollElement from './PollElement.vue'; 

export default { 
    components:{PollElement}, 
    props: ['pollData'],
    emits: ['post-comment', 'post-option'],  
    methods:{
      postComment(newComment, pollId){
        this.$emit('post-comment', newComment, pollId);  
      }, 
      postOption(chosenOption, pollTitle){
        this.$emit('post-option', chosenOption, pollTitle); 
      }
    }
}
</script>