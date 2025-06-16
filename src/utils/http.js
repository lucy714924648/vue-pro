import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://127.0.0.1:4523/m1/5734819-5417475-default/',
    timeout: 5000,
    headers: {
        authorization: `Bearer token`
    }
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (res) {
    console.log(res);
    // 对响应数据做点什么
    if (res.headers.authorization) {
        const token = res.headers.Authorization.replace('Bearer ', '')
        instance.defaults.headers.Authorization = `Bearer ${token}`
    }
    if (res.headers.refreshToken) {
        const refreshToken = res.headers.refreshToken.replace('Bearer ', '')
        // 
    }
    return res;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance;