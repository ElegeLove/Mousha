import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        basicInfoVal: {
            name: '121'
        }
    },
    mutations: {
        setData(state, data) {
            state.basicInfoVal = data;
        }
    },
    actions: {},
    modules: {}
})