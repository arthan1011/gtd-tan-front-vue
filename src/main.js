/**
 * Created by arthan on 15.07.2017.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import DailyTasks from './components/dailyTasks.vue'
import OtherTasks from './components/otherTasks.vue'
import axios from 'axios'

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/daily'},
    { path: '/daily', component: DailyTasks},
    { path: '/other', component: OtherTasks},
];
const router = new VueRouter({
    routes: routes
});

const API = axios.create({
    baseURL: '/rest'
});
Vue.prototype.$gtd = {};
Vue.prototype.$gtd.api = API;

new Vue({
    el: '#app',
    router: router,
    components: { App },
    data: {
        message: "Hello, Vue!",
    }
});