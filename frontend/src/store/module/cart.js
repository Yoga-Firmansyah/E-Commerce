import axios from "axios";

const cart = {

    namespaced: true,

    state: {
        cart: [],
        cartTotal: 0,
    },

    mutations: {
        GET_CART(state, product) {
            state.cart = product
        },
        TOTAL_CART(state, total) {
            state.cartTotal = total
        },
        CART_WEIGHT(state, weight) {
            state.cartWeight = weight
        },
        CLEAR_CART(state) {
            state.cart = []
            state.cartTotal = 0
            state.cartWeight = 0
        },
    },

    actions: {
        addToCart({ commit }, { product_id, price, quantity, weight }) {

            const token = localStorage.getItem('token')
            const user = JSON.parse(localStorage.getItem('user'))

            axios.defaults.headers.common['Authorization'] = "Bearer " + token

            axios.post('/cart', {
                product_id: product_id,
                price: price,
                quantity: quantity,
                weight: weight,
                customer_id: user.id
            })
                .then(() => {

                    axios.get('/cart')
                        .then(response => {

                            commit('GET_CART', response.data.cart)

                        })

                    axios.get('/cart/total')
                        .then(response => {

                            commit('TOTAL_CART', response.data.total)

                        })

                })
        },
        cartCount({ commit }) {

            const token = localStorage.getItem('token')

            axios.defaults.headers.common['Authorization'] = "Bearer " + token

            axios.get('/cart')
                .then(response => {

                    commit('GET_CART', response.data.cart)

                })

        },
        cartTotal({ commit }) {

            const token = localStorage.getItem('token')

            axios.defaults.headers.common['Authorization'] = "Bearer " + token

            axios.get('/cart/total')
                .then(response => {

                    commit('TOTAL_CART', response.data.total)

                })

        },
        cartWeight({ commit }) {

            const token = localStorage.getItem('token')

            axios.defaults.headers.common['Authorization'] = "Bearer " + token

            axios.get('/cart/totalWeight')
                .then(response => {

                    commit('CART_WEIGHT', response.data.total)

                })

        },
        removeCart({ commit }, cart_id) {

            const token = localStorage.getItem('token')

            axios.defaults.headers.common['Authorization'] = "Bearer " + token

            axios.post('/cart/remove', {
                cart_id: cart_id
            })
                .then(() => {


                    axios.get('/cart')
                        .then(response => {

                            commit('GET_CART', response.data.cart)

                        })

                    axios.get('/cart/total')
                        .then(response => {

                            commit('TOTAL_CART', response.data.total)

                        })

                    axios.get('/cart/totalWeight')
                        .then(response => {

                            commit('CART_WEIGHT', response.data.total)

                        })

                })

        },
        checkout({ commit }, data) {

            return new Promise((resolve, reject) => {

                axios.post('/checkout', {

                    courier: data.courier_type,
                    service: data.courier_service,
                    cost: data.courier_cost,
                    weight: data.weight,
                    name: data.name,
                    phone: data.phone,
                    province: data.province_id,
                    city: data.city_id,
                    address: data.address,
                    grand_total: data.grandTotal

                })
                    .then(response => {

                        resolve(response.data)

                        axios.post('/cart/removeAll')
                            .then(() => {

                                commit('CLEAR_CART')

                            })
                            .catch(error => {
                                console.log(error)
                            })

                    })
                    .catch(error => {
                        reject(error)
                    })

            })

        },

    },

    getters: {
        getCart(state) {
            return state.cart
        },
        cartCount(state) {
            return state.cart.length
        },
        cartTotal(state) {
            return state.cartTotal
        }
    }

}

export default cart