<template>
  <ul>
    <poll-element 
        v-for="(poll, idx) in pollData"
        :key="idx"
        :title="poll.title"
        :options="poll.options"
        :comments="poll.comments">   
    </poll-element>
  </ul>
</template>

<script>
import PollElement from './PollElement.vue'; 

export default {
    components:{PollElement}, 
    props: ['pollData'], 
}
</script>