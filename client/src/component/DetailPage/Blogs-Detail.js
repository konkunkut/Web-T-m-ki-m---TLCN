import React from 'react';
import 'antd/dist/antd.css';
import './Blogs-Detail.scss';

import MyTags from '../ListComponent/ListTags';
import MyLstLastNews from '../NewsComponent/ListLastestNews';

import {Layout, Col, BackTop, Row, Divider, Icon} from 'antd';

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

export default function DetailBlogs(props)
{
    return(
        <Content style={{ padding: '20px', marginTop: 60}}>
            {/* tạo cho đẹp */}
            <Col span={2}></Col>

            {/* khung nội dung chính */}
            <Col span={20}>
                <Row>
                    {/*tin tức */}
                    <Col className="content-detail-blogs" span={17}>
                        {/* title */}
                        <Row gutter={5}>
                            <h1>{props.location.state.title}</h1>
                        </Row>
                        {/* info */}
                        <Row gutter={5}>
                            <Icon type="edit" style={{marginLeft:20}} />Nguyễn Văn A
                            <Icon type="calendar" style={{marginLeft:20}} />dd/mm/yyyy
                            <Icon type="star" style={{marginLeft:20}} />123
                        </Row>

                        <Row><span><p></p></span></Row>

                        {/* decription */}
                        <Row gutter={5}>
                            <h3>
                                decription
                            </h3>
                        </Row>

                        <Row><span><p></p></span></Row>

                        {/* contents */}
                        <Row gutter={5}>
                            <span>
                                contents
                            </span>
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