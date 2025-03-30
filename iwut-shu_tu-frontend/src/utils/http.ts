//axios封装处理

import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

//创建一个新的Axios实例，并为其配置默认设置。
const http =axios.create({
    baseURL:'/api',
    timeout:50000
})

//请求拦截器
http.interceptors.request.use((config: InternalAxiosRequestConfig<any>)=>{
    //...
    return config
},(error:any)=>{
    return Promise.reject(error)
})

//响应拦截器
http.interceptors.response.use((response: AxiosResponse<any, any>)=>{
    return response
},(error)=>{
    return Promise.reject(error)
})

export{http}
