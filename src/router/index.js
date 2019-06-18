import Vue from 'vue';
import Router from 'vue-router';
import index from  '../components/index.vue';
import news from  '../components/news.vue';
import nextStep from '../components/nextStep.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      // children:[
      //   {
      //     path:'index',
      //     component: index,
      //   },
      //   {
      //     path:'news',
      //     component:news,
      //   },
      // ]
    },
    {
      path: 'news',
      component: news,
    }
  ]
})
