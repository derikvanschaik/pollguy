<template>
  <ul>
      <!-- maybe wrap this into it's own specific comment later -->
    <li class="comment" v-for="(comment, idx) in comments" :key="idx">
      <h3><i>{{comment.user}}</i>: {{comment.comment}}</h3> 
    </li>
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