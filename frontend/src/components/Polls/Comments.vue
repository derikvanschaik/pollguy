<template>
    <div id="wrapper"> 
        <a href="#" @click="toggleView">{{viewMessage}}</a>
        <ul v-if="view"> 
            <li v-for="comment,idx in displayedComments" :key="idx">
                <!-- link to user profile -->
                <router-link :to="'/user/'+comment.user"> 
                    {{comment.user}}
                </router-link> 
                <p class="comment" >{{comment.comment}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: ['comments'],
    data(){
        return{
            view: false,
            displayedComments: [] 
        }
    }, 
    created(){
        this.displayedComments = this.comments;
        console.log("prop comments", this.comments);  
    }, 
    computed : {
        viewMessage(){
            if (this.view){
                return 'Hide ' + this.displayedComments.length + ' comments'; 
            }
            return 'View ' + this.displayedComments.length + ' comments'; 
        }
    }, 
    methods:{
        toggleView(event){
            // this prevents the window jumping effect present when clicking on a tag elems. 
            event.preventDefault(); 
            this.view = !this.view; 
        }
    }
}
</script>
<style scoped>
#wrapper{
    padding: 4em 6em 4em 6em; 
}
/* li of each comment */
li{
    text-align: left; 
}
.comment{
    padding-left: 1em; 
    border-left: 1px solid;
    border-color: lightgray;
}
</style>