<template>
  <ul>
    <poll-element 
        v-for="(poll, idx) in pollData"
        :key="idx"
        :title="poll.title"
        :options="poll.options"
        :comments="poll.comments"
        @post-comment="postComment">   
    </poll-element>
  </ul>
</template>

<script>
import PollElement from './PollElement.vue'; 

export default {
    components:{PollElement}, 
    props: ['pollData'],
    emits: ['post-comment'], 
    methods:{
      postComment(newComment, pollTitle){
        this.$emit('post-comment', newComment, pollTitle); 
      }
    }
}
</script>