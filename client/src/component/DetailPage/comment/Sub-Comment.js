import React from 'react';
import 'antd/dist/antd.css';

import { Comment, Avatar, Form, Button, List, Input, Collapse } from 'antd';
import moment from 'moment';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
    //   header={`${comments.length} ${comments.length > 1 ? 'bình luận' : 'bình luận'}`}
      itemLayout="horizontal"
      renderItem={props => <Comment {...props} />}
      style={{textAlign: "left"}}
    />
  );
  
  
  class MySubComment extends React.Component {
    state = {
        comments: [
            {
                author: 'Anh Sang',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: "là lá là la",
                datetime: moment().fromNow(),
            },
            
        ],
        // comments: this.props.comments,
        submitting: false,
        value: '',
    };
  
    render() {
      const { comments } = this.state;
      return (
        <div>
          {/* <Comment
            avatar={
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
            }
            content={
              <Editor
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                submitting={submitting}
                value={value}
              />
            }
          /> */}
  
          {comments.length > 0 && <CommentList comments={comments}/>}
        </div>
      );
    }
  }
  
  export default MySubComment;