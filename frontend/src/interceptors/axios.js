import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/api/';


let refresh = false;

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        console.log(error.response.status)
        refresh = true;

        const { status, data } = await axios.post('/refresh', {}, {
            withCredentials: true
        });

        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        localStorage.setItem('token', data.token);

        location.reload();
    }
    refresh = false;
    return error;
});

export default axios