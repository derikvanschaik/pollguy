<template>
    <!-- will create a component here later -->
    <div id="progress">
        <div id="bar" v-bind:style="{ width: percentage}"></div> 
    </div>
</template>

<script>
export default {
    props: ['percentage']
}
</script>
<style scoped>
/* progress bar component */
#progress{
    width: 15em;  
    background: white;
    border-radius: 1em;
    border: 1px solid; 
}
#bar{
    height: 2em;  
    background: lightskyblue; 
    margin-right: 14em;
    border-radius: 1em;
}
</style>