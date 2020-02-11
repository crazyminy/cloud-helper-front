import React,{useState,useRef, forwardRef} from 'react';
import {Layout, Button,Modal} from 'antd';
const {Header,Content,Footer} = Layout;
import '../style/imgBed.less';
import ImgUploader from '../components/ImgUploader';

export default function ImgBed(){
    const [modalVisible,setModalVisible] = useState(false);
    const RImgUploader = forwardRef(ImgUploader);
    const imgUp = useRef(null);
    function handleOk(){
        imgUp.current.doUpload();
    };

    
    
    return (
        <Layout className="page_root">
            <Header style={{color:"#fff",fontSize:"25px"}}>我的图床</Header>
            <Content className="page_body">
                <div className="opsArea">
                    <Button onClick={()=>setModalVisible(true)}>上传图片</Button>
                </div>
                <div className="imgsArea">
                    imgs Area
                    
                </div>
            </Content>
            <Footer style={{textAlign:"center"}}>developed by crazyminy</Footer>

            <Modal
                width="850px"
                title="上传图片"
                visible={modalVisible}
                okText="确认上传"
                cancelText="取消"
                onOk={handleOk}
                onCancel={()=>setModalVisible(false)}
            >
                <RImgUploader ref={imgUp}/>
            </Modal>
        </Layout>
    );
}