<template>
    <ul>
      <poll-element 
          v-for="(poll, idx) in pollData"
          :key="idx"
          :title="poll.title"
          :options="poll.options"
          :comments="poll.comments"
          :id="poll._id"
          :hasVoted="poll.hasVoted" 
          @post-comment="postComment"
          @make-vote="voteOnPoll">   
      </poll-element>
    </ul>
</template>

<script>
import PollElement from './PollElement.vue'; 

export default { 
    components:{PollElement}, 
    props: ['pollData'],
    emits: ['post-comment', 'make-vote'],  
    methods:{
      postComment(newComment, pollId){
        this.$emit('post-comment', newComment, pollId);  
      }, 
      voteOnPoll(chosenOption, pollId){
        this.$emit('make-vote', chosenOption, pollId); 
      }
    }
}
</script>
<style scoped>

</style>