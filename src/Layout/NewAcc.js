
import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Form, Row, Col, Input} from 'antd';

class NewAcc extends React.Component {
  state = {
    loading: false,
    visible: false,
    alert: false,
  };

//   showModal = () => {
//     this.setState({
//       visible: false,
//     });
//   }; 

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false});
    }, 3000);
    // this.props.callback();
    this.setState({alert: true});
  };

  handleCancel = () => {
    this.setState({ visible: false });
    this.props.callback();
  };
  componentWillMount(){
      this.setState({visible:this.props.an});
  }

  render() {
    const { visible, loading } = this.state;
    return (
      <div>
        <Modal
          visible={visible}
          title="Đăng ký"
          style={{ top: 20 }}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Huỷ
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Xác nhận
            </Button>,
          ]}
        >
          <Form layout="vertical" hideRequiredMark>

            <Row gutter={5}>
              <Col span={12}>
                <Form.Item label="Họ">
                  <Input placeholder="VD: Nguyễn" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Tên">
                    <Input placeholder="VD: Văn A" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={5}>
              <Col>
                <Form.Item label="Email">
                  <Input placeholder="VD: abc@xyz" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={5}>
              <Col>
                <Form.Item label="Password">
                  <Input.Password placeholder="********"/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={5}>
              <Col>
                <Form.Item label="Nhập lại password">
                  <Input placeholder=""/>
                </Form.Item>
              </Col>
            </Row>

          </Form>
        </Modal>
      </div>
    );
  }
}

export default NewAcc;
          