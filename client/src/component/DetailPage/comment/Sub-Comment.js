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
                content: this.props.content,
                datetime: moment().fromNow(),
            },
            
        ],
        // comments: this.props.comments,
        submitting: false,
        value: '',
    };
  
    render() {
      const { comments } = this.state;
      //console.log(this.props.content);
      return (
        <div>
          {comments.length > 0 && <CommentList comments={comments}/>}
        </div>
      );
    }
  }
  
  export default MySubComment;