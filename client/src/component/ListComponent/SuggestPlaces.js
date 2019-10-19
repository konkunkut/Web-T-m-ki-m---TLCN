import React from 'react';
import 'antd/dist/antd.css';
import { Card, Col, Rate, Row } from 'antd';
import './SuggestPlaces.scss';
import PropTypes from "prop-types";

export default function SuggestPlaces(props)
{
    return(
        <Row style={{marginBottom : 10}}>
            <Card className="card-places" hoverable size="small" title={props.name}>
                <Col span={4}>
                    <img src="dog-paw-logo.png" style={{maxWidth:70, width:'100%', height:'auto'}} />
                </Col>
                <Col span={12}>
                    <p>
                        Địa chỉ: 99 Lê Văn Việt, Quận 9, Tp.HCM
                    </p>
                    <p>
                        Liện hệ: 012 345 6789
                    </p>
                </Col>
                <Col span={8}>
                    <div style={{textAlign:"center"}}>
                        <p>
                            Đánh giá
                        </p>
                        <Rate disabled allowHalf defaultValue={4} />
                    </div>
                </Col>
            </Card>
        </Row>
    );
}

SuggestPlaces.propTypes = {
    name: PropTypes.string.isRequired
  };