import React,{useState,useRef,useImperativeHandle} from 'react';
import {message} from 'antd';
import ImgPreviewItem from './ImgPreviewItem';
import {base64ToFile,getBase64,generateThumbnail} from '../common/base64ToFile';
import { request_uploadImgs } from '../api';

export default function ImgUploader(props,ref){

    const [tempSaveImgList,setTempSaveImgList] = useState([]);
    const [thumbnails,setThumbnails] = useState([]);
    const fileInputEl = useRef(null);
    const imgReg = /image/;
    useImperativeHandle(ref, () => ({
        doUpload: async () => {
            let formData = new FormData();
            tempSaveImgList.forEach((file)=>{
                formData.append("file",file);
            })
            thumbnails.forEach((base64)=>{
                formData.append("compressedFile",base64ToFile(base64))
            })
            let res = await request_uploadImgs(formData);
            if(res.msg === "success"){
                message.success("上传图片成功");
                setThumbnails([]);
                setTempSaveImgList([]);
                props.closeCallback();
            }else{
                message.success("上传文件失败")
            }
        }
    }));


    async function fileInputOnchangeHandler(){
        //e.persist();
        //console.log();
        //console.log(fileInputEl.current.files);
        let fileArr = [].__proto__.slice.call(fileInputEl.current.files);
        let tempArr = [];
        let thumbnailArr = [];
        for(let i = 0;i<fileArr.length;i++){
            let file = fileArr[i];
            if(!imgReg.test(file.type)){
                message.error("已自动过滤非图片文件");
            }else{
                let thumbnail = await generateThumbnail(file);
                thumbnailArr.push(thumbnail);
                tempArr.push(file);
            }
        }
        if(tempArr.length+tempSaveImgList.length > 4){
            message.error("图片数量超限");
        }else{
            setTempSaveImgList([...tempSaveImgList,...tempArr]);
            setThumbnails([...thumbnails,...thumbnailArr]);
        }
    }

    function deleteImgByIndex(index){
        let arrT = [...thumbnails];
        arrT.splice(index,1);
        let arrF = [...tempSaveImgList];
        arrF.splice(index,1);
        setThumbnails(arrT);
        setTempSaveImgList(arrF);
    }
    return (
        <>
            已选中 {tempSaveImgList.length}/4 张图片
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"flex-start"}}>
                
                {
                    thumbnails.map((thumbnail,index)=><ImgPreviewItem style={{float:"left"}} index={index} base64={thumbnail} name={tempSaveImgList[index].name} deleteCallback={deleteImgByIndex} key={index}/>)     
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
        </>
    );
}