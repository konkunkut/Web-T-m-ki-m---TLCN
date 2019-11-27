import React from 'react';
import 'antd/dist/antd.css';
import './CustommerPage.scss';
import {connect} from 'react-redux';
import {configName, validAvatar} from '../../action/identifyData';

import { getProfile } from './ActionCustomer/actionAPI';

import EditProfile from './ActionCustomer/EditProfile';
import OwnPlaces from './ActionCustomer/OwnPlaces';
import AddPlaces from './ActionCustomer/AddPlaces';

import { Col, Row, BackTop, Layout, Avatar, Tabs, message } from 'antd';

const { Content } = Layout;
const { TabPane } = Tabs;
var jwt = require('jsonwebtoken');

class CustommerPage extends React.Component {
    constructor() {
        super();
        this.state = {
            checkOwn: false,
            isAdmin : false,
            // userAvatar: null,
            userID: sessionStorage.getItem("userID")||null,
            // firstName: sessionStorage.getItem("firstName")||null,
            // lastName: sessionStorage.getItem("lastName"),
            userToken: sessionStorage.getItem("token")||null
        }
    }


    setOwn = () => {
        this.setState({ checkOwn: !this.state.checkOwn })
    }

    componentDidMount() {

        getProfile(this.state.userToken).then((data) => {
            if (!data.success) {
                message.error(data.message, 2);
            }
            else {
                // this.setState({ userAvatar: data.data.avatar });
            }
        });
        this.props.configName();
        this.props.validAvatar();

        var decoded = jwt.verify(sessionStorage.getItem("token"), 'Sang_oc_cho_haha');
        if(decoded.isAdmin){
            this.setState({isAdmin : decoded.isAdmin});
            // console.log(decoded);
        }
    }

    render() {
        return (
            <Content style={{ padding: '20px', marginTop: 60 }}>
                {/* tạo cho đẹp */}
                <Col span={2}></Col>

                {/* khung nội dung chính */}
                <Col span={20}>
                    <Row className="info-profile" >
                        <Avatar className="avatar-user" size={64} src={this.props.avatar} />
                        <h2>{this.props.firstName} {this.props.lastName}</h2>
                    </Row>

                    <Row className="content-profile">
                        <Tabs defaultActiveKey={this.props.location.state.currentID} tabPosition="left">
                            <TabPane tab="Địa điểm của tôi" key="1">
                                <OwnPlaces />
                                    {/* <AddPlaces callback={this.setOwn} /> */}
                            </TabPane>
                            <TabPane tab="Thông tin cá nhân" key="2">
                                <EditProfile />
                            </TabPane>
                            <TabPane tab="Thêm địa điểm" key="3">
                                <AddPlaces />
                            </TabPane>
                            {!this.state.isAdmin ? <div></div>:
                                <TabPane tab="Thêm bài biết" key="4">
                                    Thêm bài viết ở đây
                                </TabPane>
                            }
                            {!this.state.isAdmin ? <div></div>:
                                <TabPane tab="Quản lý người dùng" key="5">
                                    Xem người dùng ở đây
                                </TabPane>
                            }
                            {!this.state.isAdmin ? <div></div>:
                                <TabPane tab="Thống kê" key="6">
                                    Thống kê ở đây
                                </TabPane>
                            }
                        </Tabs>
                    </Row>
                </Col>

                {/* tạo cho đẹp */}
                <Col span={2}></Col>

                {/* back top */}
                <div>
                    <BackTop />
                </div>
            </Content>
        );
    }
}

function mapStateToProp(state){
    return{
        lastName: state.config.fullName.lastName,
        firstName: state.config.fullName.firstName,
        avatar: state.config.valid.avatar
    }
}

export default connect(mapStateToProp, {configName, validAvatar})(CustommerPage);