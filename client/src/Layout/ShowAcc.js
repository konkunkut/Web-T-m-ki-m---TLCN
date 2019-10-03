import React from 'react';
import 'antd/dist/antd.css';
import {Link} from 'react-router-dom';

import {Menu, Dropdown, Icon} from 'antd';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';


class ShowAcc extends React.Component{

    onLogout =() => {
        this.props.callback();
    };

    render() {
      return(
        <Dropdown overlay={
            <Menu>
                <Menu.Item key="0">
                  <Link to="#">Tài khoản</Link>
                </Menu.Item>
                <Menu.Item key="1">
                <Link to="#">Địa điểm của tôi</Link>
                </Menu.Item>
                <Menu.Divider />
                    <Menu.Item key="3" onClick={this.onLogout}>Đăng xuất</Menu.Item>
            </Menu>
        }
        trigger={['click']}
        >
            <a className="ant-dropdown-link" href="#">
              Chào User! <Icon type="down" />
            </a>
        </Dropdown>
      );
    }
};

export default ShowAcc;