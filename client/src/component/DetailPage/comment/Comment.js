import React from 'react';
import 'antd/dist/antd.css';
import './style.css';
import SubComment from './Sub-Comment';
import { Comment, Avatar, Form, Button, List, Input, Collapse, Icon } from 'antd';
import moment from 'moment';

import {connect} from 'react-redux';
import { CheckLogin } from '../../../action/identifyData';
import {createCmt, getCmt} from '../../../action/comment';

const { TextArea } = Input;
const { Panel } = Collapse;

const customPanelStyle = {
  borderRadius: 4,
  padding: 0,
  border: 0,
  overflow: 'hidden',
  fontSize: 10,
  maxHeight: 150,
};

const CommentList = ({ comments, submitting, value, handleChange, handleSubmit, children  }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'bình luận' : 'bình luận'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props}
                                actions={[
                                        <Collapse accordion bordered={false}>
                                              <Panel header="Reply to" key="1" showArrow={false} style={customPanelStyle}>
                                                <Comment
                                                  avatar={
                                                    <Avatar
                                                      src={sessionStorage.getItem("userAvatar") != "http://localhost:3100undefined" ? sessionStorage.getItem("userAvatar") : "https://img.favpng.com/17/3/18/computer-icons-user-profile-male-png-favpng-ZmC9dDrp9x27KFnnge0jKWKBs.jpg"}
                                                      alt={sessionStorage.getItem("lastName")}
                                                    />
                                                  }
                                                  content={
                                                    <EditorSub
                                                      onChange={handleChange}
                                                      onSubmit={handleSubmit}
                                                      submitting={submitting}
                                                      value={value}
                                                    />
                                                  }
                                                />
                                              </Panel>
                                        </Collapse>
                                      ]}
                        >
                          {children}
                        </Comment>}
    style={{textAlign: "left"}}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={2} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" style={{float:"left"}}>
        Bình luận
      </Button>
    </Form.Item>
  </div>
);

const EditorSub = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={1} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" style={{float:"left"}}>
        Gửi
      </Button>
    </Form.Item>
  </div>
);
var valueComments= [];

class MyComment extends React.Component {
    state = {
      comments: valueComments,
      commentsSub: [],
      submitting: false,
      value: '',
      submittingSub: false,
      valueSub: '',
    };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    const body ={
      id_place : this.props.id,
      content : this.state.value
    }

    setTimeout(() => {
      createCmt(sessionStorage.getItem("token"),body).then((data)=>{
        if(!data.success){
          console.log(data.message);
        }
        else{
          console.log(data.message);
        }
      })

      this.getComment();

      this.setState({
        submitting: false,
        value: '',
        comments: valueComments,
        //...this.state.comments,
      });
      //console.log(this.state.comments);
    }, 1000);
  };

  handleSubmitSub = () => {
    if (!this.state.valueSub) {
      return;
    }

    this.setState({
      submittingSub: true,
    });
    

    setTimeout(() => {
      this.setState({
        submittingSub: false,
        valueSub: '',
        commentsSub: [
          {
            author: sessionStorage.getItem("lastName"),
            avatar: sessionStorage.getItem("userAvatar") != "http://localhost:3100undefined" ? sessionStorage.getItem("userAvatar") : "https://img.favpng.com/17/3/18/computer-icons-user-profile-male-png-favpng-ZmC9dDrp9x27KFnnge0jKWKBs.jpg",
            content: <p>{this.state.valueSub}</p>,
            datetime: moment().fromNow(),
          },
          ...this.state.commentsSub,
        ],
      });
      console.log(this.state.commentsSub);
    }, 1000);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  handleChangeSub = e => {
    this.setState({
      valueSub: e.target.value,
    });
  };

  getComment = () =>{
    getCmt(this.props.id).then((data)=>{
      if(!data.success){
        console.log(data.message)
      }
      else{
        // console.log(data.data);
        for(let i=0; i< data.data.length; i++){
          valueComments.push({
            author: sessionStorage.getItem("lastName"),
            avatar: sessionStorage.getItem("userAvatar") != "http://localhost:3100undefined" ? sessionStorage.getItem("userAvatar") : "https://img.favpng.com/17/3/18/computer-icons-user-profile-male-png-favpng-ZmC9dDrp9x27KFnnge0jKWKBs.jpg",
            content: data.data[i].content,
            datetime: data.data[i].date,
          })
        }
        //console.log(valueComments);
      }
    })
  }

  componentDidMount(){
    this.getComment();
    this.setState({
      comments: valueComments,
      //...this.state.comments,
    });
    //console.log(valueComments);
  }

  render() {
    //const { comments, submitting, value, submittingSub, valueSub, commentsSub } = this.state;
    //console.log(this.state.comments);
    return (
      <div>
        {this.props.isLogin ?
        <Comment
          avatar={
            <Avatar
              src={sessionStorage.getItem("userAvatar") != "http://localhost:3100undefined" ? sessionStorage.getItem("userAvatar") : "https://img.favpng.com/17/3/18/computer-icons-user-profile-male-png-favpng-ZmC9dDrp9x27KFnnge0jKWKBs.jpg"}
              alt={sessionStorage.getItem("lastName")}
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={this.state.submitting}
              value={this.state.value}
            />
          }
        />
        :
        <p>
          Vui lòng đăng nhập để có thể đăng bình luận
        </p>
        }
        {<CommentList 
                                  comments={this.state.comments}
                                  submitting={this.state.submittingSub}
                                  value={this.state.valueSub}
                                  handleChange={this.handleChangeSub}
                                  handleSubmit={this.handleSubmitSub}
                                >
                                  <SubComment comments={this.state.commentsSub} />
                                </CommentList>}
      </div>
    );
  }
}
function mapStateToProp(state){
  return{
      isLogin : state.config.checkLogin
  }
}

export default connect(mapStateToProp, {CheckLogin})(MyComment);
// export default MyComment;