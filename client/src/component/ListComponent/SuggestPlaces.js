import React from 'react';
import 'antd/dist/antd.css';
import { Card, Col, Rate, Row } from 'antd';
import {Link } from 'react-router-dom';
import './SuggestPlaces.scss';
import PropTypes from "prop-types";

export default function SuggestPlaces(props)
{
    return(
        <Row style={{marginBottom : 10}}>
            <Link
                to={{
                    pathname:`/detailPlaces/${props.name}`,
                    state: {__id: props.key,
                            name: props.name,
                            add: props.add,
                            tel: props.tel
                        }
                    }}
            >

            <Card className="card-places" hoverable size="small" title={props.name}>
                <Col span={4}>
                    <img src="dog-paw-logo.png" style={{maxWidth:70, width:'100%', height:'auto'}} />
                </Col>
                <Col span={12}>
                    <p>
                        {props.add}
                    </p>
                    <p>
                        {props.tel}
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

            </Link>
        </Row>
    );
}

SuggestPlaces.propTypes = {
    name: PropTypes.string.isRequired
  };