import actiontypes from '../actions/actiontypes';

const initialState = {
    userName:undefined
}

function loginInfo(state = initialState, action) {
    
    switch(action.type){
        case actiontypes.SET_LOGIN_INFO:
            return action.payload;
        default:
            return state;
    }
}

export default loginInfo;