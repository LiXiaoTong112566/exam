import axios from "axios";

const service=axios.create({
    baseURL:'http://169.254.49.145:7001/',
    timeout:5000
})

//请求
service.interceptors.request.use(
  config=>{
   //判断登录状态
   

  return config
   },
   error=>{
      return Promise.reject(error)
   }
 
)


//响应
service.interceptors.response.use(
   response=>response.data,
   error=>{
     return Promise.reject(error)
   }
)


export default service;