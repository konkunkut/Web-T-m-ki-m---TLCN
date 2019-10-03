import React from 'react';
import LoginAcc from './LoginAcc';
import ShowAcc from './ShowAcc';

export default class Account extends React.Component{
    state = {
        isnew : true
    }
    setIsNew = () =>{
        this.setState({isnew:!this.state.isnew})
    }
    render(){
        if(this.state.isnew === true){
            return <LoginAcc callback={this.setIsNew}/>
        }
        else{
            return <ShowAcc callback={this.setIsNew}/>
        }
    }
}