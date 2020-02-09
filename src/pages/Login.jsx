import React from 'react';
import {useHistory} from 'react-router-dom';
import {request_login} from '../api/index'
import "../style/login.less"
import WrappedNormalLoginForm from '../components/FormDemo'
export default function Login(){
    let history = useHistory();
    async function handleJump(values){
        let res = await request_login(values);
        console.log(res);
        if(res.msg === "success"){
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