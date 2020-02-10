import React,{useState} from 'react';
import {Slider,Switch} from 'antd';
import { dateFtt } from '../common/timeFormatter';

let previous = 0;
let timeout = 1;
let latestTime = 0;

export default function ProgressDemo(){
    
    const endTime = 1581301858718;
    const startTime = 1568082719478;
    const [curTime,setCurTime] = useState(startTime);
    const [isThrottle,setIsThrottle] = useState(false);
    const [fmt,setFmt] = useState("yyyy-MM-dd");
    const marks = {
        1568082719478:dateFtt(new Date(startTime),fmt),
        1581301858718:{
            style:{
                color: '#f50',
                width:"200px"
            },
            label:dateFtt(new Date(endTime),fmt)
        },
    }
    
    function onChangeThrottle(value){
        console.log("节流执行",value,dateFtt(new Date(value),fmt));
        setTimeout(()=>{
            if(timeout === null){
                console.log("尾部",value,latestTime,dateFtt(new Date(latestTime),fmt));
            }
        },1600);
    }
    function onChangeNoThrottle(value){
        setCurTime(value);
        console.log("change!!!",dateFtt(new Date(value),fmt));
    }

    /**
     * 
     * @param {Function} func 
     * @param {number} wait 
     */
    function throttleProvider(func,wait){
        //let previous = 0;
        return function(value){
            setCurTime(value);
            latestTime = value;
            const context = this;
            const args = arguments;
            let now = Date.now();
            //console.log(previous,value);
            if(now-previous>wait){
                func.apply(context,args);
                previous = now;
            }
            if(timeout!==null){
                clearTimeout(timeout);
            }
            timeout = setTimeout(()=>{
                timeout = null;
                console.log("timeout",timeout)
            },500);
        }
        
    }
    const throttle = throttleProvider(onChangeThrottle,1000);


    return (
        <>
            <Slider 
                value = {curTime}
                step = {86400000}
                defaultValue={startTime} marks={marks} 
                min={startTime} max={endTime} 
                tipFormatter={(val)=>dateFtt(new Date(val),fmt)}
                onChange={isThrottle?throttle:onChangeNoThrottle}
            />

            启用节流：<Switch size="small" checked={isThrottle} onClick={()=>setIsThrottle(!isThrottle)}/>
        </>
    );
}