<template>
  <li>
      <div class = "poll-option-container">
          <input name="poll-option" type="radio" @click="emitChoice(option)">  
          <label for="poll-option">{{option.option}}</label> 
      </div>
  </li>
</template>

<script>
 
export default { 
    props: ['option'],
    emits: ['user-choice'],
    methods:{
        emitChoice(option){
            this.$emit('user-choice', option.option);  
        }
    }
}
</script>
<style scoped>
li{
    list-style-type: none;
    margin: 0 auto;
    padding-left: 17em; 
}
.poll-option-container{
    text-align: left;
}
label{
    font-size: x-large; 
}

</style>
