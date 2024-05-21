import { createStore } from 'vuex';

export default createStore({
    state : {
        sharedData : {}
    },
    mutations: {
        updateData(state, newData) {
            state.sharedData = newData;
        }
    },
    actions : {
        updateData({ commit }, newData) {
            commit('updateData', newData);
        }
    }
})