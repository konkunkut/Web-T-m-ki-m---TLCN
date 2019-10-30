import React from 'react';
import './Carousel.scss';
import 'antd/dist/antd.css';

import {Carousel} from 'antd';

export default function MyCarousel(){
    return(
        <Carousel autoplay>
            <div>
                <h3>1</h3>
            </div>
            <div>
                <h3>2</h3>
            </div>
            <div>
                <h3>3</h3>
            </div>
            <div>
                <h3>4</h3>
            </div>
        </Carousel>
    );
};