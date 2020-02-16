import React, { useState } from 'react';
import { Button, message } from 'antd';
import "../style/imgItemWithCopyLink.less";
import { request_raw } from '../api';
export default function ImgItemWithCopyLink(props){

    const [raw,setRaw] = useState(undefined);

    async function queryRaw(thumb){
        let res = await request_raw({thumbnailName:thumb});
        setRaw(res.raw);
        return res.raw;
    }

    async function doPreparePreview(thumb){
        if(raw === undefined){
            let r = await queryRaw(thumb);
            props.doPreview(r);
        }else{
            props.doPreview(raw);
        }
    }

    async function doCopyLink(thumb){
        let r;
        if(raw === undefined){
            r = await queryRaw(thumb);
        }else{
            r = raw;
        }
        const input = document.createElement('input');
        document.body.appendChild(input);
        input.setAttribute('value', r);
        input.select();
        
        if(document.execCommand("copy")){
            document.execCommand("copy");
            message.success("已经复制到粘贴板!");
        }else{
            message.error("不好意思出错了!");
        }
        document.body.removeChild(input);
    }
    return (
        <div className="iiwcl_root">
            <div className="img_area">
                <img src={"http://47.100.224.40/thumbs/"+props.thumb+".png"}></img> 
            </div>
            <div className="text_area">
                <Button onClick={()=>doPreparePreview(props.thumb)}>预览</Button>
                <Button type="primary" onClick={()=>doCopyLink(props.thumb)} >复制链接</Button>
            </div>
        </div>
    );
}