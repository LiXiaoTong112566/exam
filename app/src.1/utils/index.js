import Cookie from "js-cookie";

let key="authorization"
export  function setCookie(val){
  let date=new Date();
  //设置一个过期时间
  let expires=date.getTime()+10*60*60*1000;
  date.setTime(expires)
  Cookie.set(key,val,{expires:date})
}

//读取Cookie
export function getCookie(){
    return Cookie.get(key)
}


//删除cookei
export function  removeCookie(){
     Cookie.remove(key)
}