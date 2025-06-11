//import axios
import axios from 'axios'

const Api = axios.create({
    //set default endpoint API
    baseURL: 'https://backend-ecommerce.yogafirmansyah.com/api',
})

export default Api