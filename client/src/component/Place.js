import React from 'react';
import './Place.scss';
import 'antd/dist/antd.css';
import { Layout, Col, BackTop, Pagination, Row, Divider, Form, Select, Button, message } from 'antd';

import MyCarousel from './Carousel/Carousel';
import MySuggestList from './ListComponent/PlacesList';

import { getAllPlaces } from '../action/getInfoPlaces';

const { Content } = Layout;
const { Option } = Select;


class Places extends React.Component {
    constructor() {
        super();
        this.state = {
            contacts: [],
        }
    }

    componentDidMount() {
        getAllPlaces().then((data) => {
            if (!data.success) {
                message.error(data.message, 2);
            }
            else {
                this.setState({ contacts: data.data });
            }
        })
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Content style={{ padding: '20px', marginTop: 60 }}>
                {/* tạo cho đẹp */}
                <Col span={2}></Col>

                {/* khung nội dung chính */}
                <Col span={20}>
                    <div className="content-places">
                        {/* carousel */}
                        <MyCarousel />

                        <Row className="search-content">
                            {/* nội dung search */}
                            <Col className="detail-search" span={12}>
                                <Divider>Chọn khu vực bạn muốn tìm</Divider>
                                <Form>
                                    <Row gutter={5}>
                                        <Col span={8}>
                                            <Select defaultValue="default">
                                                <Option value="default">Loại địa điểm</Option>
                                            </Select>
                                        </Col>
                                        <Col span={8}>
                                            <Select defaultValue="default">
                                                <Option value="default">Chọn tỉnh/thành phố</Option>
                                            </Select>
                                        </Col>
                                        <Col span={8}>
                                            <Select defaultValue="default">
                                                <Option value="default">Chọn quận/huyện</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                </Form>
                                <Button className="submit-button">Tìm kiếm</Button>
                                <Divider></Divider>

                                <div>
                                    {this.state.contacts ? this.state.contacts.length > 0 ? <MySuggestList contacts={this.state.contacts} /> :
                                        <div>Không có dữ liệu</div> : <div>Không có dữ liệu</div>
                                    }
                                    {/* phân trang */}
                                    <Pagination
                                        defaultCurrent={1}
                                        total={50}
                                        pageSize={5}
                                        style={{ float: 'left' }}
                                    />
                                </div>
                            </Col>

                            {/* gợi ý và quảng cáo */}
                            <Col className="suggest-and-ad" span={10}>
                                bản đồ ở đây
                    </Col>
                        </Row>
                    </div>
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

const Place = Form.create()(Places);

export default Place;