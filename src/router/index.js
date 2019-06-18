import Vue from 'vue';
import Router from 'vue-router';
import index from  '../components/activityManagement/index.vue';
import news from  '../components/activityManagement/news.vue';
import nextStep from '../components/activityManagement/nextStep.vue'
import configuration from '../components/activityManagement/configuration'
import wanCommunity from '../components/activityManagement/wanCommunity'
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
    {
      path: '/configuration',
      component: configuration,
    },{
      path: '/wanCommunity',
      component: wanCommunity,
    }
  ]
})
