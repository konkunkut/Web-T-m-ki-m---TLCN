import React from 'react';
import './Home.scss';
import PlacesList from './ListComponent/PlacesList';
import BlogList from './ListComponent/BlogList';
import ButtonList from './ListComponent/ButtonList';
import 'antd/dist/antd.css';

import { getAllPlaces } from '../action/getInfoPlaces';
import {getNewHomepage} from '../action/uploadBlogs';

import {Layout, Col, Input, BackTop, message} from 'antd';
const {Content} = Layout;
const {Search} = Input;

// dữ liệu tên các quận
const districList = [];
for (let k = 0; k < 9; k++)
{
    districList.push({
        id: `${k}`,
        distric: `Quan ${k+1}`
    });
}

class Home extends React.Component
{
    constructor(){
        super();
        this.state={
            contacts : [],
            listData : [],
        }
    }

    componentDidMount(){
        getAllPlaces(1).then((data) => {
            if (!data.success) {
                message.error(data.message, 2);
            }
            else {
                this.setState({ contacts: data.data });
            }
        })

        getNewHomepage().then((data)=>{
            if (!data.success) {
                message.error(data.message, 2);
            }
            else {
                this.setState({ listData: data.data});
            }
        })
    }

    render(){
    return(
        <Content style={{ padding: '20px' }}>

            {/* tìm kiếm, gợi ý địa điểm */}
            <div className="content-home" style={{padding: 24, height: 1024}}>
                
                {/* tạo khoảng cách */}
                <Col span={3}></Col>

                {/* khung search */}
                <Col span={7} className="search-col">
                    <Search
                        placeholder="Tìm cơ sở thú y, cửa hàng chăm sóc thú cưng,..."
                        onSearch={value => console.log(value)}
                        style={{ width: "100%" , height:50}}
                        />
                    
                    {/* button gợi ý địa điểm */}
                    <div>
                        <ButtonList districList={districList} />
                    </div>
                </Col>

                {/* tạo khoảng cách */}
                <Col span={2}></Col>

                {/* danh sách địa điểm */}
                <Col span={9} className="list-col">
                    <ul>
                        <PlacesList contacts={this.state.contacts} />
                    </ul>
                </Col>

                {/* tạo khoảng cách */}
                <Col span={3}></Col>
            </div>

            {/* tin tức */}
            <div className="blog-home">
                <Col span={16} offset={4} style={{paddingTop:50}}>
                    <ul>
                        <BlogList listData={this.state.listData} />
                    </ul>
                </Col>
            </div>

            {/* back top */}
            <div>
                <BackTop />
            </div>
        </Content>
    );
    }
}

export default Home;