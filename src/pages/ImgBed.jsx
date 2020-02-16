import React,{useState,useRef, forwardRef,useEffect} from 'react';
import {Layout, Button,Modal} from 'antd';
const {Header,Content,Footer} = Layout;
import '../style/imgBed.less';
import ImgUploader from '../components/ImgUploader';
import { request_thumbnails } from '../api';
import ImgItemWithCopyLink from '../components/ImgItemWithCopyLink';

export default function ImgBed(){
    const [modalVisible,setModalVisible] = useState(false);
    const [thumbs,setThumbs] = useState([]);
    const RImgUploader = forwardRef(ImgUploader);
    const [imgPreviewVis,setImgPreviewVis] = useState(false);
    const [ipvurl,setIpvurl] = useState("");
    const imgUp = useRef(null);

    useEffect(function(){
        getThumbnails();
    },[]);

    function handleOk(){
        imgUp.current.doUpload();
    };

    function closeWindow(){
        setModalVisible(false);
    }

    async function getThumbnails(){
        let res = await request_thumbnails();
        console.log(res);
        setThumbs(res);
    }

    async function doPreview(raw){
        //let res = await request_raw({thumbnailName:thumb});
        //console.log(res);
        //document.querySelector(".ipv_div").style.backgroundImage = `url(${res.raw})`;
        setIpvurl(raw);
        setImgPreviewVis(true);
    }
    
    return (
        <Layout className="page_root">
            <Header style={{color:"#fff",fontSize:"25px"}} >我的图床</Header>
            <Content className="page_body">
                <div className="opsArea">
                    <Button onClick={()=>setModalVisible(true)}>上传图片</Button>
                </div>
                <div className="imgsArea">
                    {
                        thumbs.map((item,index)=>{
                            return <ImgItemWithCopyLink doPreview={doPreview} thumb={item} key={index}/>
                        })
                    }
                </div>
            </Content>
            <Footer style={{textAlign:"center"}}>developed by crazyminy 2019-2020</Footer>

            <Modal
                width="850px"
                title="上传图片"
                visible={modalVisible}
                okText="确认上传"
                cancelText="取消"
                onOk={handleOk}
                onCancel={()=>setModalVisible(false)}
            >
                <RImgUploader ref={imgUp} closeCallback={closeWindow}/>
            </Modal>

            <Modal
                width="1000px"
                footer={null}
                visible={imgPreviewVis}
                onCancel={()=>setImgPreviewVis(false)}>
                <div className="ipv_div" style={{backgroundImage:`url(${ipvurl})`}}>
                </div>
            </Modal>
        </Layout>
    );
}