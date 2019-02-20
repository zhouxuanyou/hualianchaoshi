import qs from 'qs';
import axios from 'axios';


//设置全局根路径
axios.defaults.baseURL = "http://127.0.0.1:888";

//axtos请求拦截
axios.interceptors.request.use((config) => {
    // 获取token
    const token = window.localStorage.getItem('token');
    // 在请求头中携带token
    config.headers.authorization = `Bearer ${token}`;
    return config;
});

//封装get，post方法
export default {
    get (url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    reject(err);
                })
        })
    },
    post (url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.post(url, qs.stringify(params))
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
}