import React from 'react';
import 'antd/dist/antd.css';
import './style.scss'

import { Form, Row, Col, Input } from 'antd';

class StepThree extends React.Component{
    state = {

    }

    render(){
        return(
            <Row className="steps-content">
                <p style={{fontWeight: "bolder"}}>
                    Xác nhận vị trí trên bản đồ để mọi người có thể tìm kiếm dễ dàng hơn
                </p>
                
            </Row>
        );
    }
}

export default StepThree;