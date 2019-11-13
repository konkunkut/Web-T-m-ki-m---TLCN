import React from 'react';
import 'antd/dist/antd.css';

import {Col, Row, Card, Divider, Avatar} from 'antd';

const {Meta} = Card;

export default function LastestNews(props)
{
    return(
        <Col span={22} offset={1}>
            <Card
                style={{width: '100%', height:'auto'}}
                cover={
                    <img alt="avatar" src={props.avatar} />
                }
                hoverable
            >
                <Meta
                    title= {
                        <a href={props.href} style={{color:'#636363'}}>
                            {props.title}
                        </a>}
                    description= {props.description}
                />
            </Card>
            <Divider></Divider>
        </Col>
    );
}