/**
 * Created by shamsiev on 26.07.2017.
 */

import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

const timezoneMinuteOffset = new Date().getTimezoneOffset();
const api = axios.create({
    baseURL: '/api',
    headers: {'AX-GTD-Minute-Offset': timezoneMinuteOffset}
});

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        daily: {}
    },

    getters: {
        getTaskName(state, getters) {
            return (taskId) => {
                if (!state.daily || !state.daily.tasks) {
                    return ''
                }
                const task = state.daily.tasks.find((t) => t.id === taskId);
                return task ? task.name : ''
            }
        }
    },
    mutations: {
        setDailyTasks(state, {dailyInfo}) {
            state.daily = dailyInfo
        }
    },
    actions: {
        loadDailyTasks(context) {
            return api.get('/task/daily')
                .then(res => {
                console.log("Vuex. daily tasks were loaded");
                context.commit('setDailyTasks', { dailyInfo: res.data });
            });
        },

        createNewTask(context, { name, type }) {
            return api.post('/task/daily', { name, type }).then(res => {
                context.dispatch('loadDailyTasks');
            });
        },

        completeTask(context, { id }) {
            return api.put(`/task/daily/${id}/state`, { value: 'done' }).then(res => {
                context.dispatch('loadDailyTasks');
            });
        },
        failTask(context, { id }) {
            return api.put(`/task/daily/${id}/state`, { value: 'failed' }).then(res => {
                context.dispatch('loadDailyTasks');
            });
        },

        changeTaskName(context, { id, name }) {
            return api.put(`/task/daily/${id}/name`, { name }).then(res => {
                context.dispatch('loadDailyTasks');
            });
        },

        deleteTask(context, { id }) {
            return api.delete(`task/daily/${id}`).then(res => {
                context.dispatch('loadDailyTasks');
            });
        },
    }
});

export default store;