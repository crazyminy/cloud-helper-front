import React from 'react';
import {Layout,message } from 'antd';
import {useHistory} from 'react-router-dom';
const { Header, Content, Footer } = Layout;
import '../style/common.less'


export default function Home(){
    const history = useHistory();
    function jumpTpDownLoadPage(){
        //useHistory.push("/")
        message.info('该功能正在开发中');
    }
    function jumpTpImgBedPage(){
        history.push("/imgBed");
    }
    return (
        <Layout className='root'>
            <Content className="page_body">
                <div className="flex_box_vertical_center">
                    <div className="appBox" onClick={jumpTpDownLoadPage}>
                        <div className="iconBox" style={{background:"#34495e"}}>
                            <i className="iconfont icon-DownloadtoCloud"/>
                        </div>
                        <div className="textBox">云端下载</div>
                    </div>
                    <div className="appBox" onClick={jumpTpImgBedPage}>
                        <div className="iconBox" style={{background:"#e74c3c"}}>
                            <i className="iconfont icon-tupian"/>
                        </div>
                        <div className="textBox">图床</div>
                    </div>
                </div>

               
            </Content>
            <Footer className="page_footer">Footer</Footer>
        </Layout>
    );
}