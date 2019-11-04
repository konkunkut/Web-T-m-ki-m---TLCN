import React from 'react';
import 'antd/dist/antd.css';

import {Col, Row, Card, Divider, Avatar, Icon} from 'antd';

const {Meta} = Card;

export default function NewBlogs(props)
{
    return(
        <Col span={11}  style={{marginTop: 20, marginBottom: 5, marginLeft: 22}}>
            <Card
                style={{width: '100%', height:'auto'}}
                cover={[
                    <img alt="avatar" src={props.avatar} />,
                    <Row>
                        <Col span={8}>
                            <p><Icon type="calendar" />{props.date}</p>
                        </Col>
                        <Col span={8}>
                            <p><Icon type="star" />{props.star}</p>
                        </Col>
                        <Col span={8}>
                            <p><Icon type="edit" />{props.blogger}</p>
                        </Col>
                    </Row>
                ]}
                hoverable
            >
                <Divider style={{marginTop:-30, marginBottom:10}}></Divider>
                <Meta
                    title= {
                        <a href={props.href} style={{color:'#636363', fontSize:20}}>
                            {props.title}
                        </a>}
                    description= {props.description}
                    
                    // style={{marginTop: -20}}
                />
            </Card>
        </Col>
    );
}