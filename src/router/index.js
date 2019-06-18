import Vue from 'vue';
import Router from 'vue-router';
import index from  '../components/activityManagement/index.vue';
import news from  '../components/activityManagement/news.vue';
import nextStep from '../components/activityManagement/nextStep.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
    },
    {
      path: '/index',
      component: index,
    },
    {
      path: '/news',
      component: news,
    },
    {
      path: '/nextStep',
      component: nextStep,
    },
  ]
})
