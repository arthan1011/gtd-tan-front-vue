/**
 * Created by arthan on 15.07.2017.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import DailyTasks from './components/dailyTasks.vue'
import OtherTasks from './components/otherTasks.vue'

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/daily'},
    { path: '/daily', component: DailyTasks},
    { path: '/other', component: OtherTasks},
];
const router = new VueRouter({
    routes: routes
});

new Vue({
    el: '#app',
    router: router,
    components: { App },
    data: {
        message: "Hello, Vue!",
    }
});