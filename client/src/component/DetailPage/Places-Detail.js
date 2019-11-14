import React from 'react';
import {Gallery, GalleryImage} from 'react-gesture-gallery';
import 'antd/dist/antd.css';
import './Places-Detail.scss';

import {Link} from 'react-router-dom';

import MyComment from './comment/Comment';

import {Col, Row, Divider, BackTop, Layout, Rate, Icon, Progress, Avatar, Tag, Button} from 'antd';

const {Content} = Layout;

const images = [
    "https://images.unsplash.com/photo-1559666126-84f389727b9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1356&q=80",
    "https://images.unsplash.com/photo-1557389352-e721da78ad9f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    "https://images.unsplash.com/photo-1553969420-fb915228af51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80",
    "https://images.unsplash.com/photo-1550596334-7bb40a71b6bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    "https://images.unsplash.com/photo-1550640964-4775934de4af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
];

export default function DetailPlaces(props)
{
    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
          if (index === 4) {
            setIndex(0);
          } else {
            setIndex(prev => prev + 1);
          }
        }, 3200);
        return () => clearInterval(timer);
    }, [index]);

    return(
        <Content style={{ padding: '20px', marginTop: 60}}>
            {/* tạo cho đẹp */}
            <Col span={3}></Col>

            {/* khung nội dung chính */}
            <Col span={18} className="content-detail-places">
                <Col span={15} className="places-decription">
                    {/* pic slider */}
                    <Row>
                        <Gallery
                            style={{
                                background: "black",
                                height: "100",
                                width: "100"
                            }}
                            index={index}
                            onRequestChange={i => {
                                setIndex(i);
                            }}
                            >
                            {images.map(image => (
                                <GalleryImage objectFit="contain" key={image} src={image} />
                            ))}
                        </Gallery>
                    </Row>

                    {/* decription */}
                    <Row style={{marginTop:10}}>
                        <Row gutter={5}>
                            {/* name */}
                            <Col span={18}>
                                <h1 style={{float:"left"}}>
                                    
                                    {props.location.state.name}
                                </h1>
                            </Col>
                            {/* rate */}
                            <Col span={6}>
                                <Rate disabled defaultValue={4} />
                            </Col>

                            <Divider></Divider>
                        </Row>
                        
                        <Row className="decription-full">
                            <p>
                                <Icon type="environment" /> {props.location.state.add}
                            </p>
                            <p>
                                <Icon type="phone" /> {props.location.state.tel}
                            </p>
                            <p>
                                Mô tả:
                            </p>
                            <p>
                                Chi tiết mô tả, PR các kiểu ở đây
                            </p>
                        </Row>
                    </Row>

                    {/* location on map */}
                    <Row>
                        <div style={{backgroundColor: '#636363'}}>
                            bản đồ ở đây
                        </div>

                        <Divider></Divider>
                    </Row>
                    
                    {/* rate and comment */}
                    <Row>
                        {/* rate */}
                        <div>
                            <Progress   type="circle" strokeColor={{'100%':'#f5e60f'}} style={{float:"left", marginRight:20}}
                                        percent={80} 
                                        format={percent => `${percent/20} /5`} />

                            <div style={{ width: 170, float:"left" }}>
                                <Progress  percent={30} strokeColor={{'0%':'#f5e60f','100%':'#f5e60f'}} size="small" status="normal" 
                                            format={percent => `${percent/percent} sao`} />
                                <Progress  percent={50} strokeColor={{'0%':'#f5e60f','100%':'#f5e60f'}} size="small" status="normal" 
                                            format={percent => `${percent/percent*2} sao`} />
                                <Progress percent={70} strokeColor={{'0%':'#f5e60f','100%':'#f5e60f'}} size="small" status="normal" 
                                            format={percent => `${percent/percent*3} sao`} />
                                <Progress percent={100} strokeColor={{'0%':'#f5e60f','100%':'#f5e60f'}} size="small" status="normal" 
                                            format={percent => `${percent/percent*4} sao`} />
                                <Progress percent={100} strokeColor={{'0%':'#f5e60f','100%':'#f5e60f'}} size="small" status="normal" 
                                            format={percent => `${percent/percent*5} sao`} />
                            </div>

                            <Divider></Divider>
                        </div>
                        
                        {/* comment */}
                        <div>
                            <MyComment />
                        </div>
                    </Row>
                </Col>
                
                {/* thông tin người đăng */}
                <Col span={8} className="owner-decription">
                    <p>Người đăng</p>
                    <Divider style={{marginTop:5}}></Divider>
                    <Row>
                        <Avatar size={48} icon="user" style={{float:"left"}} />
                        <span style={{float:"left" ,fontWeight:"bolder", marginLeft: 15, marginTop:5, fontSize:20}}>Nguyễn Văn A</span>
                    </Row>
                    <Divider></Divider>
                    <Row>
                        <Tag color="#87d068"><Icon type="phone" style={{fontSize:20}} /> <span style={{fontSize:20}}>0123 456 789</span></Tag>
                    </Row>
                </Col>
            </Col>

            {/* tạo cho đẹp */}
            <Col span={3}></Col>
                        
            {/* back top */}
            <div>
                <BackTop />
            </div>
        </Content>
    );
}