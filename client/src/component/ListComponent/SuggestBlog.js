import React from 'react';
import 'antd/dist/antd.css';
import {Col, Skeleton, List, Avatar, Icon, Row, Card} from 'antd';
import PropTypes from "prop-types";

const { Meta } = Card;

export default function SuggestBlog(props)
{
    return(
        <Col style={{marginBottom: 30}}>
              {/* <Skeleton active avatar>
                  avatar={<Avatar src={props.avatar} />}
                  title={<a href={props.href}>{props.title}</a>}
                  description={props.description}
                {props.content}
              </Skeleton> */}
          
          <Card
            hoverable
          >
            <div style={{paddingBottom: 15}}>
              <img alt="example" src={props.avatar} width="100%" height="auto"/>
            </div>
            <Meta title={<a href={props.href} style={{fontSize: 26}}>{props.title}</a>} 
                  description={props.content} style={{fontSize: 18}} />
          </Card>
        </Col>
    );
};

SuggestBlog.propTypes = {
    avatar: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
  };