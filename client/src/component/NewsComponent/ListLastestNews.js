import React from 'react';
import 'antd/dist/antd.css';
import LastestNews from './LastestNews';

export default function LstLastestNews(props)
{
    return(
        <div>
            {props.contents.map(c =>
                <LastestNews    href={c.href} 
                                title={c.title} 
                                avatar={c.avatar} 
                                description={c.description}
                                content={c.content}/>
            )}
        </div>
    );
}