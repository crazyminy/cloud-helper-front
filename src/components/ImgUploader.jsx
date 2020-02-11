import React,{useState,useRef,useImperativeHandle} from 'react';
import {message} from 'antd';
import ImgPreviewItem from './ImgPreviewItem';
import base64ToFile from '../common/base64ToFile';
import { request_uploadImgs } from '../api';

export default function ImgUploader(props,ref){

    const [tempSaveImgList,setTempSaveImgList] = useState([]);
    const fileInputEl = useRef(null);
    const imgReg = /image/;
    useImperativeHandle(ref, () => ({
        doUpload: async () => {
            let formData = new FormData();
            tempSaveImgList.forEach((file)=>{
                formData.append("file",base64ToFile(file.base64,"file"));
            })
            await request_uploadImgs(formData);
        }
    }));

    function getBase64(file){
        return new Promise(function(resolve,reject){
            let reader = new FileReader();
            reader.onload=function(){
                file.base64 = reader.result;
                resolve()
            }
            reader.readAsDataURL(file);
        });
    }

    async function fileInputOnchangeHandler(){
        //e.persist();
        //console.log();
        console.log(fileInputEl.current.files);
        let fileArr = [].__proto__.slice.call(fileInputEl.current.files);
        let tempArr = [];
        for(let i = 0;i<fileArr.length;i++){
            let file = fileArr[i];
            if(!imgReg.test(file.type)){
                message.error("已自动过滤非图片文件");
            }else{
                await getBase64(file);
                tempArr.push(file);
            }
        }
        if(tempArr.length+tempSaveImgList.length > 4){
            message.error("图片数量超限");
        }else{
            setTempSaveImgList([...tempSaveImgList,...tempArr]);
        }
    }

    function deleteImgByIndex(index){
        let arr = [...tempSaveImgList];
        arr.splice(index,1);
        setTempSaveImgList(arr);
    }
    return (
        <>
            已选中 {tempSaveImgList.length}/4 张图片
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"flex-start"}}>
                
                {
                    tempSaveImgList.map((file,index)=><ImgPreviewItem style={{float:"left"}} index={index} base64={file.base64} name={file.name} deleteCallback={deleteImgByIndex} key={index}/>)     
                }
                {
                    tempSaveImgList.length === 4?
                    null
                    :<div style={{width:"100px",height:"100px",lineHeight:"100px",textAlign:"center",margin:"20px"}}>
                        <i className="iconfont icon-add" style={{fontSize:"80px"}} onClick={()=>fileInputEl.current.click()}/>
                    </div>
                }
                
            </div>
            
            
            <input ref={fileInputEl} type="file" multiple="multiple" style={{display:"none"}} onChange={fileInputOnchangeHandler}></input>
            {/* {
                tempSaveImgList.map((file,index)=>{
                    return (
                        <div key={index}>
                            <img style={{width:"50px",height:"50px"}} src={file.base64}></img>
                        </div>
                    )
                })
            } */}
        </>
    );
}