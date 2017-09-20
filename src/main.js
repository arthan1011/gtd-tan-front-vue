/**
 * Created by arthan on 15.07.2017.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from 'app.vue'
import DailyTasks from 'routes/dailyTasks.vue'
import OtherTasks from 'routes/otherTasks.vue'
import AppHeader from 'components/appHeader.vue';
import store from 'store'
import 'style.css';
import pack from '../package.json';

Vue.use(VueRouter);
Vue.component('app-header', AppHeader);

const routes = [
    { path: '/', redirect: '/daily'},
    { path: '/daily', component: DailyTasks},
    { path: '/other', component: OtherTasks},
];
const router = new VueRouter({
    routes: routes
});

Vue.prototype.$gtd = {
    version: pack.version
};

const app = new Vue({
    el: '#app',
    store,
    router: router,
    components: { App },
    data: {
        message: "Hello, Vue!",
    }
});
export {app};