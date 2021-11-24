import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router' 
import App from './App.vue'

import Polls from './components/Polls/Polls.vue';
import Poll from './components/Polls/Poll.vue'; 

const router = createRouter({
    routes: [
        {path: '/', redirect: '/polls'},
        {path:'/polls', component: Polls}, 
        {path:'/polls/:id', component: Poll, props: true}  
    ], 
    history: createWebHistory() 
})

const app = createApp(App)
app.use(router)  
app.mount('#app')
