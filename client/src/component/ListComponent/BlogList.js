import React from 'react';
import 'antd/dist/antd.css';
import {Col, Skeleton, List, Avatar, Icon} from 'antd';
import SuggestBlog from './SuggestBlog';

function BlogList(props) {
  return (
    <div>
        {props.listData.map(c => 
            <SuggestBlog  
                         href={c.href} 
                         title={c.title} 
                         avatar={c.avatar} 
                         description={c.description}
                         content={c.content} />
        )}
    </div>
  );
}

export default BlogList;