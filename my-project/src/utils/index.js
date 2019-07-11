import Cookie from "js-cookie";

let key="authorization";
export function setCookie(value){
  
    let date=new Date();
    let expries=date.getTime()+10*60*60*1000;
    date.setTime(expries)
    Cookie.set(key,value,{expires:date})


}

export function getCookie(){
    return Cookie.get(key);

}

export function removeCookie(){
  return  Cookie.remove(key);
}