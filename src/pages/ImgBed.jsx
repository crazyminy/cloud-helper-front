import React,{useState,useRef} from 'react';
import {Layout, Button,Modal,message} from 'antd';
const {Header,Content,Footer} = Layout;
import '../style/imgBed.less';
import ProgressDemo from '../components/ProgressDemo';
export default function ImgBed(){
    const [modalVisible,setModalVisible] = useState(false);
    const [tempSaveImgList,setTempSaveImgList] = useState([]);
    const fileInputEl = useRef(null);
    const imgReg = /image/;
    function handleOk(){
        fileInputEl.current.click();
    };

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
                //setTempSaveImgList([...tempSaveImgList,file]);
                //console.log("set")
            }
        }
        setTempSaveImgList(tempArr);
    }
    
    return (
        <Layout className="page_root">
            <Header style={{color:"#fff",fontSize:"25px"}}>我的图床</Header>
            <Content className="page_body">
                <div className="opsArea">
                    <Button onClick={()=>setModalVisible(true)}>上传图片</Button>
                </div>
                <div className="imgsArea">
                    imgs Area
                    <ProgressDemo/>
                </div>
            </Content>
            <Footer style={{textAlign:"center"}}>developed by crazyminy</Footer>

            <Modal
                title="上传图片"
                visible={modalVisible}
                okText="确认上传"
                cancelText="取消"
                onOk={handleOk}
                onCancel={()=>setModalVisible(false)}
            >
                <input ref={fileInputEl} type="file" multiple="multiple" style={{display:"none"}} onChange={fileInputOnchangeHandler}></input>
                {
                    tempSaveImgList.map((file,index)=>{
                        return (
                            <div key={index}>
                                <img style={{width:"50px",height:"50px"}} src={file.base64}></img>
                            </div>
                        )
                    })
                }
            </Modal>
        </Layout>
    );
}