import axios from "axios";

const product = {

    namespaced: true,

    state: {
        products: [],
        product: {},
    },

    mutations: {
        GET_PRODUCTS(state, products) {
            state.products = products
        },
        DETAIL_PRODUCT(state, product) {
            state.product = product
        },
    },

    actions: {
        getProducts({ commit }) {

            axios.get('/products')
                .then(response => {

                    commit('GET_PRODUCTS', response.data.products)

                }).catch(error => {

                    console.log(error)

                })
        },
        getDetailProduct({ commit }, slug) {

            axios.get(`/product/${slug}`)
                .then(response => {

                    commit('DETAIL_PRODUCT', response.data.product)

                }).catch(error => {

                    console.log(error)

                })
        },
    },

    getters: {

    }

}

export default product