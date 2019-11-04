import React from 'react';
import 'antd/dist/antd.css';
import NewBlogs from "./NewBlogs";

export default function LstNewBlog(props)
{
    return(
        <div>
            {props.contentsBlogs.map(c =>
                <NewBlogs   href={c.href} 
                            title={c.title} 
                            avatar={c.avatar} 
                            description={c.description}
                            content={c.content}
                            date={c.date}
                            star={c.star}
                            blogger={c.blogger}
                            />
            )}
        </div>
    );
}