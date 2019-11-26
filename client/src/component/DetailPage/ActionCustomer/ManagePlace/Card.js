import React from 'react';
import 'antd/dist/antd.css';
import {API_URL} from '../../../../config'
import { Card, Col, Rate, Row, Icon } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

import {connect} from 'react-redux';
import {storeIdPlace} from '../../../../action/getInfoPlaces';

class CardPlace extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    handleClick = () => {
        this.props.storeIdPlace(this.props.idPlace);
        this.props.callback();
    }

    render() {
        // console.log(this.props.idPlace);
        return (
            <Row style={{ marginBottom: 10, margin: 20 }}>
                <Card className="card-places"
                    size="small"
                    title={this.props.name}
                    actions={[
                        <Link
                            to={{
                                pathname: `/detailPlaces/${this.props.idPlace}`,
                                state: {
                                }
                            }}
                        >
                            <span><Icon type="ellipsis" key="ellipsis" />Xem</span>
                        </Link>,
                        <span onClick={this.handleClick}><Icon type="edit" key="edit" />Chỉnh sửa</span>,
                        <span><Icon type="delete" key />Xoá</span>,
                    ]}
                    style={{ textAlign: "left" }}
                >
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
            </Row >
        );
    }
}

CardPlace.propTypes = {
    name: PropTypes.string.isRequired
};

function mapStateToProp(state){
    return{
        
    }
}

export default connect(mapStateToProp, {storeIdPlace})(CardPlace);