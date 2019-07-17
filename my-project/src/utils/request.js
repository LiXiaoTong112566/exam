import axios from "axios";
import {getCookie} from "@/utils/index.js"

const service=axios.create({
  baseURL:"http://169.254.12.199:7001/",
  timeout:5000
})

service.interceptors.request.use(
  config=>{
    if(getCookie()){
      config.headers['authorization']=getCookie() 
    }
    return config
  },
  error=>{
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response=>response.data,
  error=>{
    return Promise.reject(error)
  }
)

export default service