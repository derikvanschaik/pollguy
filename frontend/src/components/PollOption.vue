<template>
  <li>
      <div class = "poll-option-container">
          <input name="poll-option" type="checkbox"> 
          <label for="poll-option">{{option.option}} votes: {{option.votes}} </label> 
      </div>
  </li>
</template>

<script>
 
export default { 
    props: ['option']  
}
</script>
<style scoped>
li{
    list-style-type: none;
}

</style>
