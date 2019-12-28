import React from 'react';
import 'antd/dist/antd.css';
import './style.css';
import SubComment from './Sub-Comment';
import { Comment, Avatar, Form, Button, List, Input, Collapse, Icon } from 'antd';
import moment from 'moment';

import { connect } from 'react-redux';
import { CheckLogin } from '../../../action/identifyData';
import { createCmt, getCmt, getName_Pic } from '../../../action/comment';
import { API_URL } from '../../../config';

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

const CommentList = ({ comments, submitting, value, handleChange, handleSubmit, isLogin }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'bình luận' : 'bình luận'}`}
    itemLayout="horizontal"
    renderItem={props =>
      <Comment {...props}
        actions={
          isLogin ?
          [
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
          ]
          :
          <div></div>
      }
      >
        {/* {children} */}
        <SubComment content={props._id} />
      </Comment>}

    style={{ textAlign: "left" }}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={2} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" style={{ float: "left" }}>
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
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" style={{ float: "left" }}>
        Gửi
      </Button>
    </Form.Item>
  </div>
);
var valueComments = [];
var cmtName, cmtPic;

class MyComment extends React.Component {
  state = {
    comments: [],
    commentsSub: [],
    submitting: false,
    value: '',
    submittingSub: false,
    valueSub: '',
    loadCmt: true,
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
      loadCmt: false,
    });

    const body = {
      id_place: this.props.id,
      content: this.state.value
    }

    setTimeout(() => {
      createCmt(sessionStorage.getItem("token"), body).then((data) => {
        if (!data.success) {
          console.log(data.message);
        }
        else {
          console.log(data.message);
          this.getComment();
        }
      })
      this.setState({
        submitting: false,
        value: '',
        loadCmt: true,
      })
    }, 100);
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

  getComment = () => {
    getCmt(this.props.id).then((data) => {
      if (!data.success) {
        console.log(data.message)
      }
      else {
        //console.log(data.data);
        valueComments = [];
        for (let i = 0; i < data.data.length; i++) {
          this.getNameandPic(data.data[i].id_User, data.data[i].content, data.data[i].date, data.data[i]._id);
          //console.log(valueComments);
        }
      }
    })
  }

  getNameandPic = (_id, content, date, idCmt) => {
    getName_Pic(_id).then((data) => {
      if (!data.success) {
        console.log(data.message)
      }
      else {
        cmtName = data.data.lastName;
        cmtPic = `${API_URL}` + data.data.avatar;
        //console.log(cmtName, cmtPic);
        valueComments.push({
          _id: idCmt,
          author: cmtName,
          avatar: cmtPic != "http://localhost:3100undefined" ? cmtPic : "https://img.favpng.com/17/3/18/computer-icons-user-profile-male-png-favpng-ZmC9dDrp9x27KFnnge0jKWKBs.jpg",
          content: content,
          datetime: date,
        });
        this.setState({
          comments: valueComments,
          ...this.state.comments,
          loadCmt: true,
        })
      }
    })
  }

  componentDidMount() {
    this.getComment();
    this.renderComment();
  }

  renderComment() {
    if (this.state.loadCmt && this.state.comments.length > 0) {
      //console.log(this.state.comments);
      return (<CommentList
        comments={this.state.comments}
        submitting={this.state.submittingSub}
        value={this.state.valueSub}
        handleChange={this.handleChangeSub}
        handleSubmit={this.handleSubmitSub}
        isLogin={this.props.isLogin}
      >
      </CommentList>
      );
    }
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
        {this.renderComment()}
      </div>
    );
  }
}
function mapStateToProp(state) {
  return {
    isLogin: state.config.checkLogin
  }
}

export default connect(mapStateToProp, { CheckLogin })(MyComment);
// export default MyComment;