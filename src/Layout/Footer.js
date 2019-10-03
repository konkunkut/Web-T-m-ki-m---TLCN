import React from 'react';
import './Footer.scss';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { Layout ,Menu} from 'antd';
import { Button, Icon } from 'antd';
const { Footer } = Layout;

export default function MyFooter()
{
    return(
        <Footer className="footer-app">
            <Col span={8}>col-1</Col>
            <Col span={8}>col-2</Col>
            <Col span={8}>
                <div className="logo-footer">
                    <img class="img-responsive-footer" src="dog-paw-logo.png" width="100" height="100"></img>
                    <h1 className='text-logo-footer'>For Pet</h1>
                    
                </div>
            </Col>
        </Footer>
    );
}