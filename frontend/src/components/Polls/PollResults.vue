<template>
    <div>
        <ul>
            <li v-for="result,idx in pollResults" :key="idx">
                <h1>{{result.option}}: {{result.votes}}%</h1>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: ['pollResults'], 

}
</script>
