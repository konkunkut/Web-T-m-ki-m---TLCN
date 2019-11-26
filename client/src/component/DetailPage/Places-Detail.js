import React from 'react';
import { API_URL } from '../../config';

import SlideshowGallery from '../Carousel/slideshow-gallery';
import PrivateMAp from '../CurentLocation/privateMap';

import 'antd/dist/antd.css';
import './Places-Detail.scss';

import MyComment from './comment/Comment';
import { getDetailPlaces } from '../../action/getInfoPlaces';

import { Col, Row, Divider, BackTop, Layout, Rate, Icon, Progress, Avatar, Tag, message } from 'antd';


const { Content } = Layout;

const collection = [
    // { src: "https://images.unsplash.com/photo-1559666126-84f389727b9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1356&q=80", caption: "Caption one" },
    // { src: "https://images.unsplash.com/photo-1557389352-e721da78ad9f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80", caption: "Caption two" },
    // { src: "https://images.unsplash.com/photo-1553969420-fb915228af51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80", caption: "Caption three" },
    // { src: "https://images.unsplash.com/photo-1550596334-7bb40a71b6bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80", caption: "Caption four" },
    // { src: "https://images.unsplash.com/photo-1550640964-4775934de4af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80", caption: "Caption five" },
];
var dataMaps =[];


class DetailPlaces extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name_place: null,
            phone: null,
            stress: null,
            dictrict: null,
            city: null,
            createBy: null,
            id_type_place: null,
            lat: null,
            lng: null,
            decription: null,
            picture: [],

            userFirstName: null,
            userLastName: null,
            userTel: null,
            userAvatar: "",

            // images : [],

            index: 0,
            setIndex: null,
        }
        this.match = props.match;
    }


    componentDidMount = () => {
        getDetailPlaces(this.match.params.name).then((data) => {
            if (!data.success) {
                message.error(data.message, 2);
            }
            else {
                while (dataMaps.length) {
                    dataMaps.pop();
                }
                dataMaps.push({
                    lat : data.data.lat, 
                    lng : data.data.lng, 
                    name : data.data.name_place, 
                    phone : data.data.phone
                });

                this.setState({
                    name_place: data.data.name_place,
                    phone: data.data.phone,
                    stress: data.data.stress,
                    dictrict: data.data.dictrict,
                    city: data.data.city,
                    // createBy: data.data.createBy,
                    id_type_place: data.data.id_type_place,
                    lat: data.data.lat,
                    lng: data.data.lng,
                    decription: data.data.decription,
                    picture: data.data.picture,

                    userFirstName: data.data.createBy.fistname,
                    userLastName: data.data.createBy.lastname,
                    userTel: data.data.createBy.tel,
                    userAvatar: `${API_URL}` + data.data.createBy.picture,
                });
                while (collection.length) {
                    collection.pop();
                }
                for (let i = 0; i < this.state.picture.length; i++) {
                    collection.push({
                        src: `${API_URL}` + this.state.picture[i], caption: ""
                    })
                }
            }
        })
    }


    render() {
        // console.log(this.props.location.state.__id);
        return (
            <Content style={{ padding: '20px', marginTop: 60 }}>
                {/* tạo cho đẹp */}
                <Col span={3}></Col>

                {/* khung nội dung chính */}
                <Col span={18} className="content-detail-places">
                    <Col span={15} className="places-decription">
                        <Row gutter={5}>
                            {/* name */}
                            <Col span={18}>
                                <h1 style={{ float: "left" }}>
                                    {this.state.name_place}
                                </h1>
                            </Col>

                            <Divider></Divider>
                        </Row>


                        {/* decription */}
                        <Row style={{ marginTop: 10 }}>
                            {/* pic slider */}
                            <Row>
                                {/* pics slider */}
                                <SlideshowGallery
                                    input={collection}
                                    ratio={`3:2`}
                                    mode={`automatic`}
                                    timeout={`3000`}
                                />
                                <Divider></Divider>
                            </Row>

                            <Row className="decription-full">
                                <Col>
                                    <p>
                                        <Icon type="environment" /> {this.state.stress}, {this.state.dictrict}, {this.state.city}
                                    </p>
                                    <p>
                                        <Icon type="phone" /> {this.state.phone}
                                    </p>
                                    <p>
                                        Mô tả:
                                    </p>
                                    <p>
                                        {this.state.decription}
                                    </p>
                                </Col>
                            </Row>
                        </Row>

                        {/* location on map */}
                        <Row>
                            <Col style={{ backgroundColor: '#636363', height: 400 }}>
                                <PrivateMAp  dataMap={dataMaps} />
                            </Col>

                            <Divider></Divider>
                        </Row>

                        {/* rate and comment */}
                        <Row>
                            {/* rate */}
                            <div style={{ paddingBottom: 10 }}>
                                <Col>
                                    <Progress type="circle" strokeColor={{ '100%': '#f5e60f' }} style={{ float: "left", marginRight: 20 }}
                                        percent={80}
                                        format={percent => `${percent / 20} /5`} />

                                    <div style={{ width: 170, float: "left" }}>
                                        <Progress percent={30} strokeColor={{ '0%': '#f5e60f', '100%': '#f5e60f' }} size="small" status="normal"
                                            format={percent => `${percent / percent} sao`} />
                                        <Progress percent={50} strokeColor={{ '0%': '#f5e60f', '100%': '#f5e60f' }} size="small" status="normal"
                                            format={percent => `${percent / percent * 2} sao`} />
                                        <Progress percent={70} strokeColor={{ '0%': '#f5e60f', '100%': '#f5e60f' }} size="small" status="normal"
                                            format={percent => `${percent / percent * 3} sao`} />
                                        <Progress percent={100} strokeColor={{ '0%': '#f5e60f', '100%': '#f5e60f' }} size="small" status="normal"
                                            format={percent => `${percent / percent * 4} sao`} />
                                        <Progress percent={100} strokeColor={{ '0%': '#f5e60f', '100%': '#f5e60f' }} size="small" status="normal"
                                            format={percent => `${percent / percent * 5} sao`} />
                                    </div>
                                </Col>

                                {/* rate */}
                                <Col span={6} offset={4}>
                                    <h3>Đánh giá</h3>
                                    <Rate disabled defaultValue={4} />
                                </Col>

                            </div>

                            <Divider></Divider>

                            {/* comment */}
                            <div>
                                <MyComment />
                            </div>
                        </Row>
                    </Col>

                    {/* thông tin người đăng */}
                    <Col span={8} className="owner-decription">
                        <p style={{}}>Người đăng</p>
                        <Divider style={{ marginTop: 21 }}></Divider>
                        <Row>
                            <Avatar size={48} src={this.state.userAvatar} style={{ float: "left" }} />
                            <span style={{ float: "left", fontWeight: "bolder", marginLeft: 15, marginTop: 5, fontSize: 20 }}>
                                {this.state.userFirstName} {this.state.userLastName}
                            </span>
                        </Row>
                        <Divider></Divider>
                        <Row>
                            <Tag color="#87d068"><Icon type="phone" style={{ fontSize: 20 }} /> <span style={{ fontSize: 20 }}>{this.state.userTel}</span></Tag>
                        </Row>
                    </Col>
                </Col>

                {/* tạo cho đẹp */}
                <Col span={3}></Col>

                {/* back top */}
                <div>
                    <BackTop />
                </div>
            </Content>
        );
    }
}

export default DetailPlaces;