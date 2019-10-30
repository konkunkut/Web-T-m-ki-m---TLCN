import React from "react";
import 'antd/dist/antd.css';
import { Card, Col, Rate, Row, Pagination } from 'antd';
import SuggestPlaces from './SuggestPlaces';

function PlacesList(props) {
  return (
    <div>
        {props.contacts.map(c => 
            <SuggestPlaces key={c.id} name={c.name} />
        )}
    </div>
  );
}

export default PlacesList;