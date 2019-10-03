
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import Link from 'react-router-dom';

import NewAcc from './NewAcc';

import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Icon } from 'antd';

const { Option } = Select;

class DrawerForm extends React.Component {
  state = { 
    visible: false,
    visibleX:false
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onSubmit = () => {
    this.onClose();
    this.props.callback();
  };

  onClicku = () => {
    this.setState({visibleX:true});
  }
  newState= () => {
    this.setState({visibleX:false});
  }

  renderNewAcc(){
    if(this.state.visibleX===true){
      return(<NewAcc an={this.state.visibleX} callback={this.newState}/>);
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {this.renderNewAcc() }
        <Button onClick={this.showDrawer}>
          <Icon type="login" /> Đăng nhập
        </Button>
        <Drawer
          title="Đăng nhập"
          // width={720}
          width={360}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={5}>
              <Col>
                <Form.Item label="Email">
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Bạn chưa nhập email' }],
                  })(
                    <Input placeholder="VD: abc@xyz" />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={5}>
              <Col>
                <Form.Item label="Password">
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Bạn chưa nhập password' }],
                  })(
                    <Input.Password type="password" placeholder="********" />
                  )}
                </Form.Item>
              </Col>
            </Row>
           <Row gutter={5}>
           <div
              style={{float : "right"}}
            >
              <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                Huỷ
             </Button>
              <Button onClick={this.onSubmit} type="primary">
                Xác nhận
              </Button>
            </div>
            </Row>
          </Form>

          {/* Đăng nhập với facebook, google */}
          <div 
            style={{
              // position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              // padding: '10px 16px',
              background: '#fff',
              textAlign: 'left',
              marginTop : '20px',
              fontWeight: 'bold'
            }}
            >
              <h3>Hoặc</h3>

              <Form layout="vertical" style={{textAlign: 'center'}}>
                <Row style={{paddingTop: '10px'}}>
                  <Button type="primary" size="large" ghost>
                    <Icon type="facebook" theme="filled" />
                    Đăng nhập với Facebook
                  </Button>
                </Row>
                <Row style={{paddingTop: '10px'}}>
                  <Button type="danger" size="large" ghost>
                  <Icon type="google-square" theme="filled" />
                    Đăng nhập với Google
                  </Button>
                </Row>
              </Form>
          </div>

          {/* tạo tài khoản mới */}
          <div 
            style={{
              // position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              // padding: '10px 16px',
              background: '#fff',
              textAlign: 'left',
              marginTop : '50px',
              // fontWeight: 'bold'
            }}
            >
              Nếu chưa có tài khoản

              <Form layout="vertical" style={{textAlign: 'center', paddingTop: '10px'}}>
                <Row>
                  <Button size="small" onClick={this.onClicku}>
                    <Icon type="plus" />
                    Tạo tài khoản mới
                  </Button>
            
                </Row>
              </Form>
          </div>
        </Drawer>
      </div>
    );
  }
}

const LoginAcc = Form.create()(DrawerForm);

export default LoginAcc;