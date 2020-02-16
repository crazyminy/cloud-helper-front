import { message } from "antd";

export function ajax(url, data,_method = "GET") {

    if(_method==="GET"&&data!==null){
        url = appendUrlWhileGET(url,data);
    }
    let isLogin = sessionStorage.getItem("isLogin")==="true";
    let [token,preCode] = [undefined,undefined];
    if(isLogin){
        token = sessionStorage.getItem("token");
        preCode = sessionStorage.getItem("lastValidateTime")+"salt"
    }
    // Default options are marked with *
    return fetch(url, {
      body: _method==="GET"?null:JSON.stringify(data), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'content-type': 'application/json',
        "Authentication": isLogin?preCode+"&"+token:"",
      },
      method: _method, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
    })
    .then(response => response.json()) // parses response to JSON
    .then(res=>{
        try{
            if(res.msg!=="success"){
                message.error("服务器异常");
            }else{
                return res.data;
            }
        }catch(e){
            message.error("服务器异常");
            console.error(e);
        }
    });
}

function appendUrlWhileGET(url,params){
    let paramsList = Object.getOwnPropertyNames(params);
    //console.log(paramsList);
    if(paramsList.length===1){
        let onlyKey = paramsList[0];
        let value = params[onlyKey];
        url+=`/${value}`;
    } else {
        //键值对多于1
        for(let i = 0;i<paramsList.length;i++){
            let keyName = paramsList[i];
            let val = params[keyName];
            if(i!==0){
                url+="&";
            }else{
                url+="/?";
            }
            url+=`${keyName}=${val}`;
        }
    }
    //console.log(url);
    return url;
}

/**
 * 
 * @param {string} url 
 * @param {FormData} formdata 
 */
export function ajaxFile(url,formdata){
    let isLogin = sessionStorage.getItem("isLogin")==="true";
    let [token,preCode] = [undefined,undefined];
    if(isLogin){
        token = sessionStorage.getItem("token");
        preCode = sessionStorage.getItem("lastValidateTime")+"salt"
    }
    return fetch(url,{
        method: 'POST',
        headers:{
            "Authentication": isLogin?preCode+"&"+token:""
        },
        body: formdata
    }).then(response=>response.json())
}