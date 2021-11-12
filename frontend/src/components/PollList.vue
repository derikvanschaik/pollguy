<template>
  <ul>
    <poll-element 
        v-for="(poll, idx) in pollData"
        :key="idx"
        :title="poll.title"
        :options="poll.options"
        :comments="poll.comments"
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
      postComment(newComment, pollTitle){
        this.$emit('post-comment', newComment, pollTitle); 
      }, 
      postOption(chosenOption, pollTitle){
        this.$emit('post-option', chosenOption, pollTitle); 
      }
    }
}
</script>