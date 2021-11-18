<template>
<div class="container">
        <ul v-if="render">
            <li v-for="(choice, idx) in choices" :key="idx" class="list-container"> 
                <h3>{{choice}} : {{votePercentages[idx]}} %</h3>
                <progress-bar :percentage="votePercentages[idx]+'%'"></progress-bar>   
            </li>
        </ul>
</div>
</template>

<script>
import ProgressBar from './ProgressBar.vue';
export default {
  components: { ProgressBar }, 
    props: ['options'],
    mounted(){
        this.choices = this.options.map(option => option.option);
        this.votes = this.options.map(option => option.votes);
        this.totalSum = this.votes.reduce((a, b) => a + b, 0); 
        this.votePercentages = this.getVotePercentages(this.votes);
        this.render = true;
    }, 
    data(){
        return{
            totalSum: 0, 
            choices: [],
            votes: [], 
            votePercentages: [],
            render: false 
        }
    },
    methods:{
        // this function guarantees that all vote percentages will add up to 100  
        getVotePercentages(votes){
            if(this.totalSum === 0 ){
                return votes; 
            }
            let sum = 100;
            const result = [];
            for(let i = 0; i < votes.length-1; i++){
                const percentage = Math.floor( 100*(votes[i]/this.totalSum));
                result.push(percentage); 
                sum -= percentage; 
            }
            result.push(sum); 
            return result; 
             
        }
    }
}
</script>
<style scoped>
.container{
    margin: 0 auto;
    padding-left: 8em;
}
.list-container{
    text-align: left;
}

</style>