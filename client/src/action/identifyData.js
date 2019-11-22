import axios from 'axios';
import API_URL from '../config';
import {CONFIG_NAME, VALID_AVATAR} from './constants'


export const configName = () => dispatch =>{
    const lastName = sessionStorage.getItem("lastName");
    const firstName = sessionStorage.getItem("firstName");
    dispatch({
        type : CONFIG_NAME,
        payload : {lastName, firstName}
    })
}

export const validAvatar = () => dispatch =>{
    const avatar = sessionStorage.getItem("userAvatar");
    dispatch({
        type : VALID_AVATAR,
        payload : {avatar}
    })
}