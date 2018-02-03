/**
 * Created by arthan on 15.07.2017.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from 'app.vue'
import DailyTasks from 'routes/dailyTasks.vue'
import Donations from 'routes/donations.vue'
import AppHeader from 'components/appHeader.vue';
import tooltip from 'directives/tooltip'
import store from 'store'
import 'style.css';
import pack from '../package.json';
import 'directives/tooltip.css'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);
Vue.use(VueRouter);
Vue.component('app-header', AppHeader);

// custom directives
Vue.directive('gtd-tooltip', tooltip);

const routes = [
    { path: '/', redirect: '/daily'},
    { path: '/daily', component: DailyTasks},
    { path: '/donation', component: Donations},
];
const router = new VueRouter({
    routes: routes,
    mode: 'history'
});

const i18n = new VueI18n({
    locale: navigator.language.substr(0, 2),
});

const windowClickList = [];

window.onclick = (event) => {
    windowClickList.forEach(f => f(event));
};

Vue.prototype.$gtd = {
    version: pack.version,
    setLocale(locale) {
        i18n.locale = locale;
    },
    getLocale() {
        return i18n.locale
    },
    onWindowClickList: windowClickList
};

const app = new Vue({
    i18n: i18n,
    el: '#app',
    store,
    router: router,
    components: { App },
    data: {
        message: "Hello, Vue!",
    }
});
export {app};