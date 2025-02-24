import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import axios from './interceptors/axios'

const app = createApp(App)

app.use()

app.use(router)

app.use(store)

app.use(Antd)

app.mixin({

    methods: {

        moneyFormat(number) {
            let reverse = number.toString().split('').reverse().join(''),
                thousands = reverse.match(/\d{1,3}/g)
            thousands = thousands.join('.').split('').reverse().join('')
            return thousands
        },

        calculateDiscount(product) {
            return product.price - (product.price * (product.discount) / 100)
        }

    }
})

app.mount('#app')