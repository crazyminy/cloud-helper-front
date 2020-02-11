import React, { useState } from 'react';
import '../style/imgPreviewItem.less';
import { Icon } from 'antd';
export default function ImgPreviewItem(props){

    const [imgClass,setImgClass] = useState("listenW");

    function onloadHandler(e){
        e.persist();
        //console.log(e);
        if(e.target.height > e.target.width){
            setImgClass("listenH");
        }
    }

    function doDelete(){
        console.log("dsafaf");
        props.deleteCallback(props.index);
    }
    return (
        <div className="ipi_root">
            <div className="img_area">
                <div className="fixRightTop">
                </div>
                <Icon type="delete" className="fixRightTopIcon" onClick={doDelete}/>
                <img src={props.base64} onLoad={onloadHandler} className={imgClass}></img> 
            </div>
            <div className="text_area">
                {props.name}
            </div>
        </div>
    );
}