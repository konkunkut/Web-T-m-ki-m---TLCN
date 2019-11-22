import React from 'react';
import './News.scss';
import 'antd/dist/antd.css';
import MyTags from './ListComponent/ListTags';
import MyLstLastNews from './NewsComponent/ListLastestNews';
import MyNewBlogs from './NewsComponent/ListNewBlogs';

import {Layout, Col, Input, BackTop, Row, Divider, Pagination} from 'antd';

const {Content} = Layout;

const lstTags=[
    {id: 1, tags: "thú cưng" },
    {id: 2, tags: "các bệnh thường gặp" },
    {id: 3, tags: "cơ sở uy tín" },
    {id: 4, tags: "khác" }
];

const contents=[];
for (let i = 0; i < 5; i++) {
    contents.push({
      href: 'http://ant.design',
      title: `Tiêu đề blog ${i}`,
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
  }

const contentsBlogs=[];
  for (let i = 0; i < 5; i++) {
    contentsBlogs.push({
        href: 'http://ant.design',
        title: `Tiêu đề blog ${i}`,
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
        description:
          'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        date: 'dd/mm/yyy',
        star: '123',
        blogger: 'Nguyễn Văn A',
      });
    }


export default function News()
{
    return(
        <Content style={{ padding: '20px', marginTop: 60}}>
            {/* tạo cho đẹp */}
            <Col span={2}></Col>

            {/* khung nội dung chính */}
            <Col span={20}>
                <Row>
                    {/* list tin tức */}
                    <Col className="content-news" span={17}>
                        <Row>
                            <MyNewBlogs contentsBlogs={contentsBlogs} />
                        </Row>
                        <Row>
                            {/* phân trang */}
                            <Pagination 
                                defaultCurrent={1} 
                                total={50} 
                                pageSize={5} 
                                style={{float: 'left'}}
                            />
                        </Row>
                    </Col>

                    <Col span={1}></Col>

                    {/* gợi ý và menu */}
                    <Col className="my-menu" span={6}>
                        {/* menu */}
                        <Row className="menu-news">
                            <h3 style={{marginLeft:10, textAlign: "left"}}>Tags</h3>
                            <Divider style={{marginTop:5, marginBottom:10}}></Divider>

                            <MyTags lstTags={lstTags} />
                        </Row>

                        {/* bài viết mới */}
                        <Row className="new-blogs">
                            <h3 style={{textAlign:"left", marginLeft:10}}>Bài viết mới</h3>
                            <Divider style={{marginTop:5, marginBottom:10}}></Divider>

                            <MyLstLastNews contents={contents} />
                        </Row>

                    </Col>
                </Row>
            </Col>

            {/* tạo cho đẹp */}
            <Col span={2}></Col>
                        
            {/* back top */}
            <div>
                <BackTop />
            </div>
        </Content>
    );
}