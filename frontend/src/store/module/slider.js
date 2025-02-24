import axios from "axios";

const slider = {

    namespaced: true,

    state: {
        sliders: []
    },

    mutations: {
        GET_SLIDERS(state, sliders) {
            state.sliders = sliders
        }
    },

    actions: {
        getSliders({ commit }) {

            axios.get('/sliders')
                .then(response => {

                    commit('GET_SLIDERS', response.data.sliders)

                }).catch(error => {

                    console.log(error)

                })
        }
    },

    getters: {

    }

}

export default slider