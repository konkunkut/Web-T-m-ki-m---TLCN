import React from 'react';
import './Place.scss';
import 'antd/dist/antd.css';
import {Layout, Col, Input, BackTop, Pagination, Row, Divider, Form, Select, Button} from 'antd';

import MyCarousel from './Carousel/Carousel';
import MySuggestList from './ListComponent/PlacesList';

const {Content} = Layout;
const {Search} = Input;
const {Option} = Select;

// dự liệu test list địa điểm
const contacts = [];
for (let j = 0; j < 10; j++)
{
    contacts.push({
        id: `${j}`,
        name : `PET House ${j}`
    });
}

class Places extends React.Component {


render()
{
    const { getFieldDecorator } = this.props.form;
    return(
        <Content style={{ padding: '20px', marginTop: 60}}>
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
                            {/* <Form>
                                <Divider>Chọn khu vực bạn muốn tìm</Divider>
                                thanh tìm kiếm 
                                <Row gutter={5}>
                                    <Col span={8}>
                                    <Form.Item>
                                        {getFieldDecorator('search1', {
                                            rules: [
                                            { required: true, message: 'Chọn loại địa điểm' },
                                            ],
                                        })( <Select defaultValue="default">
                                                <Option value="default">Loại địa điểm</Option>
                                            </Select>)}
                                    </Form.Item>
                                    </Col>

                                    <Col span={8}>
                                    <Form.Item>
                                        {getFieldDecorator('search2', {
                                            rules: [
                                            { required: true, message: 'Chọn tỉnh/thành phố' },
                                            ],
                                        })(<Select />)}
                                    </Form.Item>
                                    </Col>

                                    <Col span={8}>
                                    <Form.Item>
                                        {getFieldDecorator('search3', {
                                            rules: [
                                            { required: true, message: 'Chọn quận/huyện' },
                                            ],
                                        })(<Select />)}
                                    </Form.Item>
                                    </Col>
                                </Row>
                                
                                submit button
                                <Button className="submit-button">Tìm kiếm</Button>

                                <Divider></Divider>
                            </Form> */}
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

                            <MySuggestList contacts={contacts} />
                            {/* phân trang */}
                            <Pagination 
                                defaultCurrent={1} 
                                total={50} 
                                pageSize={5} 
                                style={{float: 'left'}}
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