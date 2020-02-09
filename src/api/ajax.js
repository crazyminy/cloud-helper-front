export function ajax(url, data,_method = "GET") {

    if(_method==="GET"){
        url = appendUrlWhileGET(url,data);
    }

    // Default options are marked with *
    return fetch(url, {
      body: _method==="GET"?null:JSON.stringify(data), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'content-type': 'application/json',
        "Authentication":"fjaiefj-ferge8453535-jg84h8yj58y"
      },
      method: _method, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
    })
    .then(response => response.json()) // parses response to JSON
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