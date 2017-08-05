/**
 * Created by shamsiev on 26.07.2017.
 */

import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

const api = axios.create({
    baseURL: '/rest'
});

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        dailyTasks: [
            {
                name: "One",
                datelineItems: [
                    1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0
                ],
            },
            {
                name: "For",
                datelineItems: [
                    1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0
                ],
            },
            {
                name: "Программирование",
                datelineItems: [
                    1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0
                ],
            },
        ]
    },
    mutations: {
        setDailyTasks(state, {tasks}) {
            state.dailyTasks = tasks
        }
    },
    actions: {
        loadDailyTasks(context) {
            console.log("Vuex. load daily tasks");
            api.get('/task/daily').then(res => {
                console.log("Vuex. daily tasks were loaded");
                context.commit('setDailyTasks', { tasks: res.data });
            });
        },

        createNewTask(context, { name }) {
            return api.post('/task/daily', {name}).then(res => {
                context.dispatch('loadDailyTasks');
            });
        }
    }
});

export default store;