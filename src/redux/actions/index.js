import actiontypes from './actiontypes';
export function setLoginInfo(logininfo){
    return {
        type:actiontypes.SET_LOGIN_INFO,
        payload:logininfo
    }
}