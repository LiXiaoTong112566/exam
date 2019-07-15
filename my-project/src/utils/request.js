import axios from "axios";
import {getCookie} from "@/utils/index.js"

const service=axios.create({
<<<<<<< HEAD
  baseURL:"http://192.168.43.214:7001/",
=======
  baseURL:"http://192.168.2.151:7001/",
>>>>>>> 3aaf41c5d2f2bc449f1d42222aaf77db867a484a
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