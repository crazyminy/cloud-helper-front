import {ajax} from './ajax';

const SERVER_BASE = "http://localhost:3000/api"

export const requestData = ()=>ajax(SERVER_BASE+"/helloworld",{});
export const request_login = (data)=>ajax(SERVER_BASE+"login",data,"POST");