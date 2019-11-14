import React from 'react';
import './Footer.scss';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { Layout ,Menu} from 'antd';
import { Button, Icon } from 'antd';
const { Footer } = Layout;

export default function MyFooter()
{
    return(
        <Footer className="footer-app">
            <Col span={8} className="decription-footer">
                <h4>
                    Dự án cung cấp công cụ trực quan, tìm kiếm nhanh chóng các cơ sở thú y, cửa hàng dịch vụ chăm sóc thú cưng
                </h4>
                <h4>
                    Cung cấp các bài viết về sức khoẻ chuẩn xác
                </h4>
            </Col>
            <Col span={2}></Col>
            <Col span={4} className="decription-footer">
                <h4>
                    Đội ngũ phát triển dự án:
                </h4>
                <h5>
                    Nguyễn Anh Sang
                </h5>
                <h5>
                    Võ Phước Sơn
                </h5>
                <h5>
                    ---
                </h5>
                <h5>
                    Liên hệ: nasabp98@gmail.com
                </h5>
            </Col>
            <Col span={2}></Col>
            <Col span={8}>
                <div className="logo-footer">
                    <img class="img-responsive-footer" src="dog-paw-logo.png" width="100" height="100"></img>
                    <h1 className='text-logo-footer'>For Pet</h1>
                    <h3>
                        Lựa chọn tốt nhất cho thú cưng nhà bạn
                    </h3>
                </div>
            </Col>
        </Footer>
    );
}