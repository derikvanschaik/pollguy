<template>
    <ul>
        <poll
            v-for="poll in polls"
            :key="poll._id"
            :id="poll._id"
            :title="poll.title"
            :comments="poll.comments"
            :options="poll.options" 
            >
        </poll>
    </ul>
</template>

<script>
import Poll from './Poll.vue' 
export default {
    components: {Poll}, 
    async created(){
        this.polls = await this.fetchPolls(); 
    }, 
    data(){
        return {
            polls: [] 
        }
    }, 
    methods:{
        async fetchPolls(){
            const url = 'http://localhost:3000/polls'; 
            const result = await fetch(url); 
            const data = await result.json(); 
            if (data.status === "Success"){
                return data.data; 
            }
            return null;  
        }
    }
}
</script>
