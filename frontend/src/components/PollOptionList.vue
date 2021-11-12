<template>
  <ul>
      <poll-option v-for="(option, idx) in options" :key="idx" :option="option" @user-choice="emitChoice(option)"></poll-option> 
  </ul>
</template>

<script>
import PollOption from './PollOption.vue'; 

export default {
    components:{PollOption},
    emits: ['user-choice'], 
    props: ['options'] , 
    methods:{
      emitChoice(option){
        this.$emit('user-choice', option); 
      }
    }
}
</script>
