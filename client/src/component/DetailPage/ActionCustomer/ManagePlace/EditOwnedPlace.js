import React from 'react';
import 'antd/dist/antd.css';

import UploadPics from '../../../UploadPic/UploadPic';
import ListComment from './ListComment';
import { districsHCM, districsHN, typePlace } from '../../../../config';

import { Col, Row, Divider, Layout, Form, Input, Button, message, Select, Progress } from 'antd';

const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

class EditPlace extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            isEdit: false,

            typePlaces: typePlace,
            city: [
                { id: "default", name: "Chọn tỉnh/thành phố" },
                { id: "hcm", name: "Tp.Hồ Chí Minh" },
                { id: "hn", name: "Hà Nội" }
            ],
            district: [
                { id: "default", name: "Chọn quận/huyện" }
            ],

            typePlaceValue: null,
            citiesValue: null,
            districtsValue: null,
            telValue: null,
            namePlaceValue: null,
            stressPlaceValue: null,
            decripttionValue: null

        }
    }

    handleOk = () => {

    }

    handleCancel = () => {
        this.setState({
            isEdit: false,
        });
        // this.props.callback();
        this.props.form.resetFields();
    };

    setDataDistrict = (value) => {
        this.setState({ citiesValue: value })
        this.props.form.setFieldsValue({
            districts: undefined
        })
        // console.log(value);
        switch (value) {
            case "Tp.Hồ Chí Minh":
                this.setState({
                    district: districsHCM
                });
                return;
            case "Hà Nội":
                this.setState({
                    district: districsHN
                });
                return;
            default:
                this.setState({
                    district: [
                        { id: "default", name: "Chọn quận/huyện" }
                    ]
                });
                return;
        }
    }

    getDataDistrict = (value) => {
        this.setState({ districtsValue: value });
    }

    getType = (value) => {
        this.setState({ typePlaceValue: value });
    }

    inputChange = event => {
        this.setState({ [event.target.name]: event.target.value, isEdit: true });
    }

    prevPage = () => {
        this.setState({
            isEdit: false,
        });
        this.props.callback();
        this.props.form.resetFields();
    }

    render() {
        const { form: { getFieldDecorator } } = this.props;
        return (
            <Content style={{ padding: 5 }}>
                <Row>
                    <Button type="link" style={{ textAlign: "right", float: "right" }} onClick={this.prevPage} >Quay lại</Button>
                </Row>
                <Row gutter={5} style={{ backgroundColor: '#FFFFFF', padding: 5 }}>
                    {/* edit info */}
                    <Col span={14} >
                        <h2 style={{ textAlign: "left" }}>Thông tin</h2>
                        <Divider style={{ marginTop: 10 }}></Divider>
                        <Form layout="vertical" hideRequiredMark >
                            <Row gutter={5}>
                                <Col span={8}>
                                    <Form.Item label="Loại địa điểm">
                                        {getFieldDecorator('type-Place', {
                                            rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                            initialValue: this.state.typePlaces[0].type
                                        })(
                                            <Select onChange={this.getType} >
                                                {
                                                    this.state.typePlaces.map(typePlace => (
                                                        <Option value={typePlace.type} >
                                                            {typePlace.type}
                                                        </Option>
                                                    ))
                                                }
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={16}>
                                    <Form.Item label="Tên địa điểm">
                                        {getFieldDecorator('name-Place', {
                                            rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                            //initialValue : 
                                        })(
                                            <Input name="namePlaceValue" onChange={this.inputChange} />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={5}>
                                <Col span={24}>
                                    <Form.Item label="Địa chỉ cụ thể">
                                        {getFieldDecorator('address', {
                                            rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                            //initialValue :
                                        })(
                                            <Input name="stressPlaceValue" onChange={this.inputChange} />,
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={5}>
                                <Col span={8}>
                                    <Form.Item label="Tỉnh/Thành phố">
                                        {getFieldDecorator('cities', {
                                            rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                            initialValue: this.state.city[0].name
                                        })(
                                            <Select onChange={this.setDataDistrict}>
                                                {
                                                    this.state.city.map(cities => (
                                                        <Option value={cities.name} >
                                                            {cities.name}
                                                        </Option>
                                                    ))
                                                }
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Quận/Huyện">
                                        {getFieldDecorator('districts', {
                                            rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                            initialValue: this.state.district[0].name
                                        })(
                                            <Select onChange={this.getDataDistrict} >
                                                {
                                                    this.state.district.map(districts => (
                                                        <Option value={districts.name} >
                                                            {districts.name}
                                                        </Option>
                                                    ))
                                                }
                                            </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={5}>
                                <Col span={8}>
                                    <Form.Item label="Số điện thoại">
                                        {getFieldDecorator('sdt', {
                                            rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                            //initialValue:
                                        })(
                                            <Input name="telValue" onChange={this.inputChange} />,
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={5}>
                                <Col span={24}>
                                    <Form.Item label="Mô tả">
                                        {getFieldDecorator('decripttion', {
                                            rules: [{ required: true, message: 'Không bỏ trống phần này!' }],
                                            //initialValue:
                                        })(
                                            <TextArea name="decripttionValue" rows={4} onChange={this.inputChange} />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>

                        {/* button submit */}
                        <Row>
                            <Col span={8} offset={8} >
                                <Button type="primary" ghost loading={this.state.loading} onClick={this.handleOk} >Lưu</Button>
                                <Divider type="vertical"></Divider>
                                <Button type="danger" ghost onClick={this.handleCancel} >Huỷ</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={1}></Col>

                    {/* edit pics */}
                    <Col span={9}>
                        <UploadPics length={"10"} />
                    </Col>
                </Row>

                <Row gutter={5} style={{ backgroundColor: '#FFFFFF', padding: 5 }}>
                    <Divider></Divider>
                    {/* list comment */}
                    <Col span={15}>
                        <h2 style={{ textAlign: "left" }}>Bình luận</h2>
                        <Divider style={{ marginTop: 10 }}></Divider>
                        <ListComment />
                    </Col>
                    <Col span={1}></Col>

                    {/* total rate */}
                    <Col span={8}>
                        <h2 style={{ textAlign: "left" }}>Đánh giá</h2>
                        <Divider style={{ marginTop: 10 }}></Divider>
                        {/* 5 sao */}
                        <Row>
                            <Progress type="circle" strokeColor={{ '100%': '#f5e60f' }}
                                percent={45}
                                format={percent => `${percent} /100`}
                            />
                            <p>5 sao</p>
                        </Row>
                        {/* 4 sao */}
                        <Row>
                            <Progress type="circle" strokeColor={{ '100%': '#f5e60f' }}
                                percent={18}
                                format={percent => `${percent} /100`}
                            />
                            <p>4 sao</p>
                        </Row>
                        {/* 3 sao */}
                        <Row>
                            <Progress type="circle" strokeColor={{ '100%': '#f5e60f' }}
                                percent={25}
                                format={percent => `${percent} /100`}
                            />
                            <p>3 sao</p>
                        </Row>
                        {/* 2 sao */}
                        <Row>
                            <Progress type="circle" strokeColor={{ '100%': '#f5e60f' }}
                                percent={10}
                                format={percent => `${percent} /100`}
                            />
                            <p>2 sao</p>
                        </Row>
                        {/* 1 sao */}
                        <Row>
                            <Progress type="circle" strokeColor={{ '100%': '#f5e60f' }}
                                percent={1}
                                format={percent => `${percent} /100`}
                            />
                            <p>1 sao</p>
                        </Row>
                    </Col>
                </Row>
            </Content>
        );
    }
}

// function mapStateToProp(state){
//     return{

//     }
// }

const EditPlaces = Form.create()(EditPlace);
// export default connect(mapStateToProp, {editProfile})(EditPlaces);
export default EditPlaces;