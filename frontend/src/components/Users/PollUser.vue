<template>
    <div>
        <h1>{{user}}</h1>
        <!-- user comments -->
        <div class="comments-container">
            <a href="#" @click="toggleViewComments">Comments by {{user}}</a>  
            <ul v-if="viewComments"> 
                <li 
                    v-for="commentedPoll,idx in commentedPolls"
                    :key="idx">
                    <h4>Comments {{this.user}} made on 
                        <span>
                            <router-link 
                            :to="'/polls/'+commentedPoll.id">
                                {{commentedPoll.title}}
                            </router-link>
                        </span>
                    </h4>

                    <ul>
                        <li 
                            v-for="comment,idx in commentedPoll.comments"
                            :key="idx">
                            <p>{{comment}}</p>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- user created polls -->
        <div class="polls-container">
            <a href="#" @click="toggleViewPolls">Polls created by {{user}}</a>  
            <ul v-if="viewCreatedPolls"> 
                <li 
                    v-for="poll,idx in createdPolls"
                    :key="idx">
                    <router-link :to="'/polls/'+poll.id">{{poll.title}}</router-link> 
                </li>
            </ul> 
        </div>
    </div>
</template>

<script>
export default {
    created(){
        this.user = this.$route.params.user; 
    },
    async mounted(){
        const commentedPollsData = await this.fetchData('comments'); 
        this.commentedPolls = commentedPollsData.data.map( poll => {
            return {title: poll.title, id: poll.id,  comments: poll.comments}; 
        });
        const createdPollsData = await this.fetchData('polls'); 
        this.createdPolls = createdPollsData.data.map( poll =>{
            return {title: poll.title, id: poll.id}; 
        })

    }, 
    data(){
        return{
            user: 'Default user', 
            commentedPolls: [],
            createdPolls: [], 
            viewComments: false, 
            viewCreatedPolls: false, 
        }
    },
    methods:{
        async fetchData(urlEndpoint){
            const url = 'http://localhost:3000/user/' + this.user + '/' + urlEndpoint; 
            const response = await fetch(url); 
            return await response.json(); 
        },
        toggleViewComments(event){
            event.preventDefault(); 
            this.viewComments = !this.viewComments; 
        },
        toggleViewPolls(event){
            event.preventDefault(); 
            this.viewCreatedPolls = !this.viewCreatedPolls; 
        }
    }

}
</script>
