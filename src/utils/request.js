import axios from 'axios'
// import router from 'vue-router'
// import {getToken,removeToken,removeNickName, setToken} from '@/utils/auth'



axios.defaults.baseURL = '/api'
// axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.token = token;
    }
    return config
}, error => {
    return Promise.reject(error);
})

// axios.interceptors.response.use(res => {
//   if (typeof res.data !== 'object') {
//     ElMessage.error('服务端异常！')
//     return Promise.reject(res)
//   }
//   if (res.data.code != "00000") {
//     if (res.data.message) {
//       ElMessage.error(res.data.message)
//     }
//     // 登录已过期
//     if (res.data.code == 'A0230') {
//       // 移除 token 
//       removeToken();
//       removeNickName();
//       router.push({ path: '/login' })
//     }

//     return Promise.reject(res.data)
//   }

//   return res.data
// }, error => {
//   ElMessage.error('网络异常！')
//   console.log(error)
//   Promise.reject(error)
// })

axios.interceptors.response.use(res => {
    // console.log("axios", res);
    return res.data
}, error => {
    // console.log('err', error);
    if (error.response.data.code === 401) {
        const token = localStorage.getItem('token');
        if (token) {
            localStorage.removeItem('token')
        }
        setTimeout(() => {
            location.href = '/login';
        }, 1200);
    }
    return error.response.data
    // Promise.reject(error)
})

export default axios