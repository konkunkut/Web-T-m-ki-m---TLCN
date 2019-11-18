import React from 'react';
import 'antd/dist/antd.css';
import './CustommerPage.scss';
import {connect} from 'react-redux';
import {configName} from '../../action/identifyData';

import { getProfile } from './ActionCustomer/actionAPI';

import EditProfile from './ActionCustomer/EditProfile';
import OwnPlaces from './ActionCustomer/OwnPlaces';

import { Col, Row, Divider, BackTop, Layout, Icon, Progress, Avatar, Tag, Tabs, message } from 'antd';
import AddPlaces from './ActionCustomer/AddPlaces';

const { Content } = Layout;
const { TabPane } = Tabs;

class CustommerPage extends React.Component {
    constructor() {
        super();
        this.state = {
            checkOwn: false,
            userAvatar: null,
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
                this.setState({ userAvatar: data.data.avatar });
            }
        });
        this.props.configName();
    }

    render() {
        return (
            <Content style={{ padding: '20px', marginTop: 60 }}>
                {/* tạo cho đẹp */}
                <Col span={2}></Col>

                {/* khung nội dung chính */}
                <Col span={20}>
                    <Row className="info-profile" >
                        <Avatar className="avatar-user" size={64} icon="user" />
                        <h2>{this.props.firstName} {this.props.lastName}</h2>
                    </Row>

                    <Row className="content-profile">
                        <Tabs defaultActiveKey={this.props.location.state.currentID} tabPosition="left">
                            <TabPane tab="Thông tin chi tiết" key="1">
                                <EditProfile />
                            </TabPane>
                            <TabPane tab="Địa điểm của tôi" key="2">
                                {this.state.checkOwn ?
                                    <OwnPlaces checkOwn={this.state.checkOwn} /> :
                                    <AddPlaces callback={this.setOwn} />
                                }
                            </TabPane>
                            {/* <TabPane tab="Tab 3" key="3">
                                Content of Tab Pane 3
                            </TabPane> */}
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
        firstName: state.config.fullName.firstName
    }
}

export default connect(mapStateToProp, {configName})(CustommerPage);