import React from 'react';
import 'antd/dist/antd.css';
import './AddPlaces.scss';

import StepOne from './StepSignPlace/StepOne';
import StepTwo from './StepSignPlace/StepTwo';
import StepThree from './StepSignPlace/StepThree';

import {connect} from 'react-redux';
import {storeTempData, storeTempPic} from '../../../action/storeTempInfo';
import {registerPlace} from '../../../action/uploadPlace';

import { Row, Layout, Icon, Steps, message, Button } from 'antd';

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

        let formData = new FormData();
        // formData.append("name", this.state.fileList[0].originFileObj);
        // const direct_place = {
        //     stress: this.props.stress,
        //     dictrict: this.props.district,
        //     city: this.props.city,
        // }

        formData.set("name_place",this.props.namePlace);
        formData.set("phone",this.props.tel);
        formData.set("stress",this.props.stress);
        formData.set("dictrict",this.props.district);
        formData.set("city",this.props.city);
        formData.set("id_type_place",this.props.typePlace);
        formData.set("lat","");
        formData.set("lng","");
        formData.set("decription",this.props.decription);
        formData.set("createBy", sessionStorage.getItem("userID"));

        for(let i=0;i<this.props.pics.length;i++)
        {
            formData.append("listPics", this.props.pics[i].originFileObj);
        }
        // console.log(this.props.pics);

        // message.success('Processing complete!', 2);
        setTimeout(() => {
            registerPlace(formData, sessionStorage.getItem("token"))
            .then((data)=>{
                if(!data.success){
                }
                else{
                    // console.log(data.data.picture);
                    message.success(data.message, 2);

                    this.setSign();
                }
            });
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
                        <div>
                            {(current===0) ? <StepOne /> : 
                             (current===1) ? <StepTwo /> : 
                             (current===2) ? <StepThree /> : <div>null</div>
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
                    <p style={{ textAlign: "left" }} >Quảng bá địa điểm của bạn đến mọi người!</p>
                    <Button type="primary" ghost style={{ float: "left" }} onClick={this.setSign} >
                        <Icon type="form" />Đăng địa điểm
                    </Button>
                </Content>
            );
        }
    }
}

function mapStateToProp(state){
    return{
        typePlace : state.config.tempData.typePlace,
        namePlace : state.config.tempData.namePlace,
        tel : state.config.tempData.tel,
        stress : state.config.tempData.stress,
        district : state.config.tempData.district,
        city : state.config.tempData.city,
        decription : state.config.tempData.decription,

        pics : state.config.tempPics.pic,
    }
}

// const EditProfile = Form.create()(EditProfiles);
export default connect(mapStateToProp, {storeTempData, storeTempPic})(AddPlaces);

// export default AddPlaces;