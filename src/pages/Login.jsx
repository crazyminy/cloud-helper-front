import React from 'react';
import {useHistory} from 'react-router-dom';
import {request_login} from '../api/index'
import "../style/login.less"
import WrappedNormalLoginForm from '../components/FormDemo'
import { connect } from 'react-redux';
import {setLoginInfo} from '../redux/actions'
function Login(props){
    let history = useHistory();
    async function handleJump(values){
        let res = await request_login(values);
        console.log(res);
        if(res.msg === "success"){
            sessionStorage.setItem("isLogin","true")
            sessionStorage.setItem("lastValidateTime",res.lastValidateTime);
            sessionStorage.setItem("token",res.token);
            history.push("/home");
        }
    }

    return (
        <div className="root">
            <div className="formArea">
                <WrappedNormalLoginForm jumpToNext={handleJump}/>
            </div>
        </div>
    );
}

const mapState = function(state){
    return {
        loginInfo:state.loginInfo
    }
}

export default connect(mapState,{setLoginInfo})(Login);