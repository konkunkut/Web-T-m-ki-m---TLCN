import React from 'react';
import './Home.scss';
import PlacesList from './ListComponent/PlacesList';
import BlogList from './ListComponent/BlogList';
import ButtonList from './ListComponent/ButtonList';
import 'antd/dist/antd.css';

import {Layout, Col, Input, BackTop, Row} from 'antd';
const {Content} = Layout;
const {Search} = Input;

// dự liệu test list địa điểm
const contacts = [];
for (let j = 0; j < 5; j++)
{
    contacts.push({
        id: `${j}`,
        name : `PET House ${j}`
    });
}

//dữ liệu test blog
const listData = [];
for (let i = 0; i < 3; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `Tiêu đề blog ${i}`,
    avatar: 'pic-for-blog.jpg',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

// dữ liệu tên các quận
const districList = [];
for (let k = 0; k < 9; k++)
{
    districList.push({
        id: `${k}`,
        distric: `Quan ${k+1}`
    });
}

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
                        <PlacesList contacts={contacts} />
                    </ul>
                </Col>

                {/* tạo khoảng cách */}
                <Col span={3}></Col>
            </div>

            {/* tin tức */}
            <div className="blog-home">
                <Col span={16} offset={4} style={{paddingTop:50}}>
                    <ul>
                        <BlogList listData={listData} />
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