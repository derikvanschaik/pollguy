<template>
    <div>
        <ul>
            <li v-for="result,idx in pollResults" :key="idx">
                <h1>{{result.option}}: {{getPercentage(result.votes)}}%</h1>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: ['pollResults'],
    created(){
        this.pollResults.forEach(option=>{
            this.totalSum += option.votes; 
        }); 
        if (this.totalSum === 0){
            this.totalSum = 1; 
        }
        console.log(this.totalSum); 
    }, 
    data(){
        return {
            totalSum: 0 
        }
    },
    methods:{
        getPercentage(votes){
            return ((votes/this.totalSum)*100).toFixed(2); 
        }
    }

}
</script>
