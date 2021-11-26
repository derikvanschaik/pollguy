<template>
    <div>
        <a href="#" @click="toggleView">{{viewMessage}}</a>
        <ul v-if="view"> 
            <li v-for="comment,idx in displayedComments" :key="idx">
                <h4>{{comment.user}}</h4> 
                <p>{{comment.comment}}</p>
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