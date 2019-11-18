import axios from 'axios';
import API_URL from '../config';
import {CONFIG_NAME, VALID_AVATAR} from './constants'


export const configName = () => dispatch =>{
    console.log("vnnv");
    const lastName = sessionStorage.getItem("lastName");
    const firstName = sessionStorage.getItem("firstName");
    // console.log(firstName, lastName);
    dispatch({
        type : CONFIG_NAME,
        payload : {lastName, firstName}
    })
}

export const validAvatar = (token) => dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
}