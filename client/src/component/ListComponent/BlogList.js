import React from 'react';
import 'antd/dist/antd.css';
import {Col, Skeleton, List, Avatar, Icon} from 'antd';
import SuggestBlog from './SuggestBlog';

function BlogList(props) {
  return (
    <div>
        {props.contacts.map(c => 
            <SuggestBlog key={c.id} name={c.name} />
        )}
    </div>
  );
}

export default BlogList;