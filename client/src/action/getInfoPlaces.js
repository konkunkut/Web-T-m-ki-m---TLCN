import {API_URL} from '../config';
import axios from 'axios';
import {STORE_ID_PLACE} from './constants';

export const getAllPlaces=()=>{
    return axios.get(`${API_URL}/Places/getAllPlace`)
                .then(res=>{
                    // console.log("thành cÔng");
                    return res.data;
                })
                .catch(err=>{
                    console.log("Lỗi");
                })
}

export const getUserPlaces =(token) =>{

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    return axios.get(`${API_URL}/Places/getUserPlaces`, config)
                .then(res=>{
                    // console.log("thành công");
                    return res.data
                })
                .catch(err=>{
                    console.log("Lỗi");
                })
}

export const getDetailPlaces=(id_Place)=>{
    return axios.get(`${API_URL}/Places/getDetailPlaces/`+id_Place)
                .then(res=>{
                    console.log(res.data)
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
}

export const storeIdPlace =(id_Places)=> dispatch =>{
    const idPlace = id_Places;
    dispatch({
        type: STORE_ID_PLACE,
        payload: {idPlace}
    });
}