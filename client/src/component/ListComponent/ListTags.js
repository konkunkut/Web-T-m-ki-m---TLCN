import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col} from 'antd';

import BlogsTags from './BlogsTag';

export default function ListTags(props)
{
    return(
        <Col >
            {props.lstTags.map(c => 
                <BlogsTags key={c.id} tags={c.tags} />
            )}
        </Col>
    );
}