/**
 * Created by shamsiev on 26.07.2017.
 */

import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'

const timezoneMinuteOffset = new Date().getTimezoneOffset();
const api = axios.create({
    baseURL: '/rest',
    headers: {'AX-GTD-Minute-Offset': timezoneMinuteOffset}
});

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        daily: {
            meta: {
                dates: [
                    {day: 32, month: "October", year: 2099},
                    {day: 33, month: "October", year: 2099},
                ]
            },
            tasks: [
                {
                    name: "Historia",
                    datelineItems: [
                        {
                            date: {day: 32, month: "October", year: 2099},
                            complete: false
                        },
                        {
                            date: {day: 33, month: "October", year: 2099},
                            complete: true
                        },
                    ]
                }
            ]
        }
    },
    getters: {
        getTaskName(state, getters) {
            return (taskId) => {
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
            console.log("Vuex. load daily tasks");
            api.get('/task/daily')
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
            return api.put(`/task/daily/${id}/state`, 'done').then(res => {
                context.dispatch('loadDailyTasks');
            });
        },
        failTask(context, { id }) {
            return api.put(`/task/daily/${id}/state`, 'failed').then(res => {
                context.dispatch('loadDailyTasks');
            });
        },

        changeTaskName(context, { id, name }) {
            return api.put(`/task/daily/${id}/name`, { name }).then(res => {
                context.dispatch('loadDailyTasks');
            });
        },

    }
});

export default store;