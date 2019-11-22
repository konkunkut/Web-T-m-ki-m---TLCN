import React from 'react';
import 'antd/dist/antd.css';
import { Card, Col, Rate, Row, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './SuggestPlaces.scss';
import PropTypes from "prop-types";
import {API_URL} from '../../config';

class SuggestPlaces extends React.Component {

    render() {
        return (
            <Row style={{ marginBottom: 10 }}>
                <Link
                    to={{
                        pathname: `/detailPlaces/${this.props.name}`,
                        state: {
                            __id: this.props.key,

                        }
                    }}
                >

                    <Card className="card-places" hoverable size="small" title={this.props.name}>
                        <Col span={4}>
                            <img src={`${API_URL}`+this.props.picture} style={{ maxWidth: 70, width: '100%', height: 'auto' }} />
                        </Col>
                        <Col span={12}>
                            <p>
                                <Icon type="environment" /> Địa chỉ: {this.props.stress}, {this.props.dictrict}, {this.props.city}
                            </p>
                            <p>
                                <Icon type="phone" /> Liên hệ: {this.props.tel}
                            </p>
                        </Col>
                        <Col span={8}>
                            <div style={{ textAlign: "center" }}>
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
}


SuggestPlaces.propTypes = {
    name: PropTypes.string.isRequired
};

export default SuggestPlaces;