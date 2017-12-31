import Vue from 'vue';
import Router from 'vue-router';
import Notfund from "../components/page/Notfund";
Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
         { path: '*', component:Notfund },
          {
            path: '/index',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/readme',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)

                },
                
                {
                    path: '/index',
                    component: resolve => require(['../components/Questionnaire/index.vue'], resolve)
                },
                {
                    path: '/create',
                    component: resolve => require(['../components/Questionnaire/CreateQuestionnaire.vue'], resolve)
                },
                {
                    path: '/analysis',
                    component: resolve => require(['../components/Questionnaire/Analysis.vue'], resolve)
                }
                ,
                {
                    path: '/sample',
                    component: resolve => require(['../components/Questionnaire/SampleData.vue'], resolve)
                }
                ,
                {
                    path: '/chart',
                    component: resolve => require(['../components/Questionnaire/StatisticalChart.vue'], resolve)
                },
                {
                    path: '/edite',
                    component: resolve => require(['../components/Questionnaire/EditeQuestionnaire.vue'], resolve)
                }
               
               
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/user',
            component: resolve => require(['../components/User/user.vue'], resolve)
        },
    ]
})
