import React from 'react';
import 'antd/dist/antd.css';
import './AddPlaces.scss';

import { Col, Row, Divider, BackTop, Layout, Icon, Steps, message, Button } from 'antd';
import { async } from 'q';

const { Content } = Layout;

const { Step } = Steps;

const steps = [
    {
        title: 'Bước 1',
        content: 'First-content',
    },
    {
        title: 'Bước 2',
        content: 'Second-content',
    },
    {
        title: 'Bước 3',
        content: 'Last-content',
    },
];

class AddPlaces extends React.Component {
    // state = {
    //     checkSign: false
    // }

    setSign = () => {
        this.setState({ checkSign: !this.state.checkSign, current: 0 })
    }

    onSigned = () => {
        message.success('Processing complete!', 2);
        setTimeout(() => {
            this.props.callback();
          }, 500);
    }

    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            checkSign: false
        };
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render() {
        const { current } = this.state;

        if (this.state.checkSign) {
            return (
                <Content className="content-parent">
                    <Row>
                        <div className="step-title">
                            <Steps current={current}>
                                {steps.map(item => (
                                    <Step key={item.title} title={item.title} />
                                ))}
                            </Steps>
                        </div>
                        <div className="steps-content">
                            {(current===0) ? steps[current].content : 
                             (current===1) ? steps[current].content : 
                             (current===2) ? steps[current].content : <div>null</div>
                            }                        
                        </div>

                        <div className="steps-action">
                            {current < steps.length - 1 && (
                                <Button type="primary" onClick={() => this.next()}>
                                    Next
                                </Button>
                            )}
                            {current === steps.length - 1 && (
                                <Button type="primary" onClick={this.onSigned}>
                                    Done
                                </Button>
                            )}
                            {current > 0 && (
                                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                    Previous
                                </Button>
                            )}
                            <Button style={{float:"right"}} onClick={this.setSign} style={{float:"right"}}>
                                Huỷ bỏ
                            </Button>
                        </div>
                    </Row>
                </Content>
            );
        }
        else {
            return (
                <Content style={{ backgroundColor: '#FFFFFF', minHeight: 300, paddingLeft: 20, paddingTop: 10 }}>
                    <p style={{ textAlign: "left" }} >Bạn chưa đăng địa điểm nào!</p>
                    <Button type="primary" ghost style={{ float: "left" }} onClick={this.setSign} >
                        <Icon type="form" />Đăng địa điểm
                    </Button>
                </Content>
            );
        }
    }
}

export default AddPlaces;