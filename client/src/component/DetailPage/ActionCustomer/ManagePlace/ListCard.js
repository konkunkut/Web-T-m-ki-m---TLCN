import React from "react";
import 'antd/dist/antd.css';
import Cards from './Card';

class ListCard extends React.Component {

  handleClick=()=>{
    this.props.callback();
  }
  render() {
    return (
      <div>
        {this.props.contacts.map(c =>
          <Cards key={c._id}
            name={c.name_place}
            stress={c.stress}
            dictrict={c.dictrict}
            city={c.city}
            picture={c.picture[0]}
            tel={c.phone}

            callback={this.handleClick}
          />
        )}
      </div>
    );
  }
}

export default ListCard;