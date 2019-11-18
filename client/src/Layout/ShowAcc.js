import React from 'react';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';

import {connect} from 'react-redux';
import {configName} from '../action/identifyData';

import { Menu, Dropdown, Icon } from 'antd';


class ShowAcc extends React.Component {

  state = {
    // name : sessionStorage.getItem("lastName")
  }
  componentDidMount(){
    this.props.configName();
  }

  onLogout = () => {
    sessionStorage.clear();
    this.props.callback();
  };

  render() {
    return (
      <Dropdown overlay={
        <Menu>
          <Menu.Item key="0">
            <Link to={{
              pathname: `/profile/${sessionStorage.getItem("userID")}`,
              state: { currentID: "1" }
            }}
            >Tài khoản</Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to={{
              pathname: `/profile/${sessionStorage.getItem("userID")}`,
              state: { currentID: "2" }
            }}>Địa điểm của tôi</Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3" onClick={this.onLogout}>Đăng xuất</Menu.Item>
        </Menu>
      }
        trigger={['click']}
      >
        <a className="ant-dropdown-link" href="#">
          Chào {this.props.lastName} <Icon type="down" />
        </a>
      </Dropdown>
    );
  }
};

function mapStateToProp(state){
  return{
      lastName: state.config.fullName.lastName,
      firstName: state.config.fullName.firstName
  }
}

export default connect(mapStateToProp, {configName})(ShowAcc);