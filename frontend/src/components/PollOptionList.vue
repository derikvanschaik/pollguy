<template>
  <ul>
      <poll-option v-for="(option, idx) in options" :key="idx" :option="option"></poll-option> 
  </ul>
</template>

<script>
import PollOption from './PollOption.vue'; 

export default {
    components:{PollOption}, 
    props: ['options']  
}
</script>
