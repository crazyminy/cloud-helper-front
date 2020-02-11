import {ajax, ajaxFile} from './ajax';

const SERVER_BASE = "http://localhost:3000/api"

export const requestData = ()=>ajax(SERVER_BASE+"/helloworld",{});
export const request_login = (data)=>ajax(SERVER_BASE+"login",data,"POST");
export const request_uploadImgs = (data)=>ajaxFile("http://localhost:3000/file/upload",data); 