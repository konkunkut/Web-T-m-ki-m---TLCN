import React from 'react';
import 'antd/dist/antd.css';
import { Card, Col, Rate } from 'antd';
import './SuggestPlaces.scss';
import PropTypes from "prop-types";

export default function SuggestPlaces(props)
{
    return(
        <div>
            <Card className="card-places" size="small" title={props.name} extra={<a href="#">Xem thêm</a>}>
                <Col span={4}>
                    <img src="dog-paw-logo.png" style={{width:70, height:70}} />
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
        </div>
    );
}

SuggestPlaces.propTypes = {
    name: PropTypes.string.isRequired
  };