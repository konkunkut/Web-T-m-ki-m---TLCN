import React from 'react';
import 'antd/dist/antd.css';

import { API_URL } from '../../../../config';
import UploadPics from '../../../UploadPic/UploadPic';
import ListComment from './ListComment';
import SlideshowGallery from '../../../Carousel/slideshow-gallery';
import { districsHCM, districsHN, typePlace } from '../../../../config';
import { storeIdPlace, getDetailPlaces } from '../../../../action/getInfoPlaces';
import { connect } from 'react-redux';

import { Col, Row, Divider, Layout, Form, Input, Button, message, Select, Progress } from 'antd';

const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

const collection = [];

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

            name_place: null,
            phone: null,
            stressvalue: null,
            dictrictvalue: null,
            cityvalue: null,
            createBy: null,
            id_type_place: null,
            lat: null,
            lng: null,
            decription: null,
            picture: [],

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

    componentDidMount() {
        getDetailPlaces(this.props.idPlace).then((data) => {
            if (!data.success) {
                message.error(data.message, 2);
            }
            else {
                this.setState({
                    name_place: data.data.name_place,
                    phone: data.data.phone,
                    stressvalue: data.data.stress,
                    dictrictvalue: data.data.dictrict,
                    cityvalue: data.data.city,
                    // createBy: data.data.createBy,
                    id_type_place: data.data.id_type_place,
                    lat: data.data.lat,
                    lng: data.data.lng,
                    decription: data.data.decription,
                    picture: data.data.picture,
                });
            };
            while (collection.length) {
                collection.pop();
            }
            for (let i = 0; i < this.state.picture.length; i++) {
                collection.push({
                    src: `${API_URL}` + this.state.picture[i], caption: ""
                })
            }
        });
    }

    render() {
        // console.log(this.state.name_place);
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
                                            initialValue: this.state.id_type_place
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
                                            initialValue: this.state.name_place,
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
                                            initialValue: this.state.stressvalue,
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
                                            initialValue: this.state.cityvalue
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
                                            initialValue: this.state.dictrictvalue
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
                                            initialValue: this.state.phone,
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
                                            initialValue: this.state.decription
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
                        {/* pics slider */}
                        <SlideshowGallery
                            input={collection}
                            ratio={`3:2`}
                            mode={`automatic`}
                            timeout={`3000`}
                        />
                        <Divider></Divider>

                        <p>Cập nhật ảnh mới:</p>
                        <UploadPics length={"10"} isVisible={false} />
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

function mapStateToProp(state) {
    return {
        idPlace: state.config.storeIdPlace.idPlace
    }
}

const EditPlaces = Form.create()(EditPlace);
export default connect(mapStateToProp, { storeIdPlace })(EditPlaces);
// export default EditPlaces;