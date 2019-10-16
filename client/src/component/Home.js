import React from 'react';
import './Home.scss';
import PlacesList from './ListComponent/PlacesList';
import 'antd/dist/antd.css';

import {Layout, Col, Input, BackTop} from 'antd';
const {Content} = Layout;
const {Search} = Input;

// dự liệu test list địa điểm
const contacts = [
    { id: 1, name: "Pet House 1" },
    { id: 2, name: "Thú Y ABC" },
    { id: 3, name: "Pet House ZYX" },
    { id: 4, name: "Bla Bla" },
    { id: 5, name: "Bla Bla 2" }
  ];



export default function Home()
{
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
                    
                </Col>

                {/* tạo khoảng cách */}
                <Col span={2}></Col>

                {/* danh sách địa điểm */}
                <Col span={9} className="list-col">
                    <ul>
                    <PlacesList contacts={contacts} />
                    </ul>
                </Col>

                {/* tạo khoảng cách */}
                <Col span={3}></Col>
            </div>

            {/* tin tức */}
            <div className="blog-home">

            </div>

            {/* back top */}
            <div>
                <BackTop />
            </div>
        </Content>
    );
}