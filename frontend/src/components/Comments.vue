<template>
  <ul>
      <!-- maybe wrap this into it's own specific comment later -->
    <li class="comment" v-for="(comment, idx) in comments" :key="idx">{{comment}}</li>
  </ul> 
</template>

<script>
 
export default { 
    props: ['comments']  
}
</script>
<style scoped>
.comment{
  list-style-type: none; 
}
</style>