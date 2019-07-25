import axios from "axios";
import {getCookie} from "@/utils/index.js"

const service=axios.create({
  baseURL: /jasonandjay.com/.test(window.location.host)?'https://exam.jasonandjay.com':'http://127.0.0.1:7001/',

  
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