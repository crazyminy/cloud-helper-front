import {ajax, ajaxFile} from './ajax';

const SERVER_BASE = "http://47.100.224.40:3000/api"

export const requestData = ()=>ajax(SERVER_BASE+"/helloworld",{});
export const request_login = (data)=>ajax(SERVER_BASE+"login",data,"POST");
export const request_uploadImgs = (data)=>ajaxFile(SERVER_BASE+"/uploadImg",data); 
export const request_thumbnails = ()=>ajax(SERVER_BASE+"/thumbnails",null,"GET");
export const request_raw = (data)=>ajax(SERVER_BASE+"/raw",data,"GET");