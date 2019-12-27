import React from 'react';
import 'antd/dist/antd.css';
import {HOME_URL, typeBlog} from '../../../config';

import {connect} from 'react-redux';
import UploadPics from '../../UploadPic/UploadPic';

import { Row, Layout, Icon, message, Button, Form, Col, Input, Select } from 'antd';

const { Content } = Layout;
const {Option} = Select;
const {TextArea } = Input;

class AddPlace extends React.Component {
    constructor(){
        super();
        this.state = {
            typeBlogs : typeBlog,

            typeBlogsValue: typeBlog[0].id,
        }
    };

    getType = (value) =>{
        this.setState({typeBlogsValue: value});
    }

    render(){

        const { form :{getFieldDecorator}} = this.props;
        return (
            <Content style={{backgroundColor: '#FFFFFF', minHeight: 300, padding: 5, paddingTop: 10}}>
                <Row>
                    <Col>
                        <Form layout="vertical" hideRequiredMark >
                            <Row gutter={5}>
                                <Col span={15}>
                                    <Form.Item label="Tiêu đề">
                                    {getFieldDecorator('title', {
                                        rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                        //initialValue: 
                                    })(
                                        <Input/>
                                    )}
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Loại bài viết">
                                        {getFieldDecorator('type-Blog', {
                                            rules: [{}],
                                            initialValue : this.state.typeBlogs[0].id
                                        })(
                                        <Select onChange={this.getType} >
                                            {
                                                this.state.typeBlogs.map(typeBlog =>(
                                                    <Option key={typeBlog.id} >
                                                        {typeBlog.type}
                                                    </Option>
                                                ))
                                            }
                                        </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={5}>
                                <Col span={15}>
                                    <Form.Item label="Lời mở đầu/Giới thiệu/Mô tả">
                                    {getFieldDecorator('decription', {
                                        rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                        //initialValue: 
                                    })(
                                        <TextArea rows={4} />
                                    )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={5}>
                                <Col span={15}>
                                    <p style={{float:"left"}}>Thêm ảnh</p>
                                    <UploadPics length={"2"} isVisible={false}/>
                                </Col>
                            </Row>
                            <Row gutter={5}>
                                <Col span={15}>
                                    <Form.Item label="Nội dung">
                                    {getFieldDecorator('contents', {
                                        rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                        //initialValue: 
                                    })(
                                        <TextArea rows={15} />
                                    )}
                                    </Form.Item>
                                </Col>
                            </Row>

                        </Form>
                    </Col>
                </Row>
                {/* confim button */}
                <Row>
                    <Col span={4} offset={10} >
                        
                    </Col>
                </Row>
            </Content>
        );
    }
}
const AddPlaces = Form.create()(AddPlace);
export default AddPlaces;