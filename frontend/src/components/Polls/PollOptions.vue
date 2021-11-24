<template>
    <ul>
        <li v-for="option,idx in pollOptions" :key="idx"> 
            <div>
                <label :for="name">{{option.option}}</label>
                <input type="radio" :name="name">
            </div>
        </li>
    </ul>
</template>
<script>
export default {
    props: ['pollOptions', 'name'] 
}
</script>