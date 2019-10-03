import React from 'react';
import './Home.scss';
import 'antd/dist/antd.css';

import {Layout} from 'antd';
const {Content} = Layout;

export default function Home()
{
    return(
        <Content style={{ padding: '20px' }}>
            <div className="content-home" style={{padding: 24, minHeight: 300}}>
                
            </div>
        </Content>
    );
}