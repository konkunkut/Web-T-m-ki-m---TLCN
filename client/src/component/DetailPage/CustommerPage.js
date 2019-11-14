import React from 'react';
import 'antd/dist/antd.css';
import './CustommerPage.scss';

import EditProfile from './ActionCustomer/EditProfile';
import OwnPlaces from './ActionCustomer/OwnPlaces';

import { Col, Row, Divider, BackTop, Layout, Icon, Progress, Avatar, Tag, Tabs } from 'antd';
import AddPlaces from './ActionCustomer/AddPlaces';

const { Content } = Layout;
const { TabPane } = Tabs;

class CustommerPage extends React.Component {
    state = {
        checkOwn: false
    }

    setOwn = () => {
        this.setState({ checkOwn: !this.state.checkOwn })
    }

    // setOwn = () => {
    //     if(/*kiểm tra tml có sở hữu địa điểm nào chưa*/0)
    //     {
    //         // nếu có
    //         this.state.checkOwn = true;
    //     }
    //     else
    //     {
    //         this.state.checkOwn = false;
    //     }
    // }

    render() {
        return (
            <Content style={{ padding: '20px', marginTop: 60 }}>
                {/* tạo cho đẹp */}
                <Col span={2}></Col>

                {/* khung nội dung chính */}
                <Col span={20}>
                    <Row className="info-profile" >
                        <Avatar className="avatar-user" shape="square" size={64} icon="user" />
                        <h2>Nguyễn Văn A</h2>
                    </Row>

                    <Row className="content-profile">
                        <Tabs defaultActiveKey={this.props.location.state.currentID} tabPosition="left">
                            <TabPane tab="Thông tin chi tiết" key="1">
                                <EditProfile />
                            </TabPane>
                            <TabPane tab="Địa điểm của tôi" key="2">
                                {this.state.checkOwn ?
                                    <OwnPlaces checkOwn={this.state.checkOwn} />:
                                    <AddPlaces callback={this.setOwn} />
                                }
                            </TabPane>
                            <TabPane tab="Tab 3" key="3">
                                Content of Tab Pane 3
                            </TabPane>
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

export default CustommerPage;