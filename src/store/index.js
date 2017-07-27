/**
 * Created by shamsiev on 26.07.2017.
 */

import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        dailyTasks: [
            { name: "One" },
            { name: "For" },
            { name: "All" },
        ]
    }
});

export default store;